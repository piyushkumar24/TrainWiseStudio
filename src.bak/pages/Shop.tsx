
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ShopHeader } from '@/components/shop/ShopHeader';
import { ShopFilters } from '@/components/shop/ShopFilters';
import { ShopGrid } from '@/components/shop/ShopGrid';
import { AddItemFAB } from '@/components/shop/AddItemFAB';
import { AddItemModal } from '@/components/shop/AddItemModal';

export interface ShopItem {
  id: string;
  title: string;
  description: string | null;
  category: 'Fitness' | 'Nutrition' | 'Mental Health';
  type: 'Program' | 'Product';
  price: number;
  tags: string[];
  image_urls: string[];
  view_count: number;
  purchase_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const Shop = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCoach, setIsCoach] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const [filters, setFilters] = useState({
    category: 'All',
    type: 'All',
    sortBy: 'Newest',
    search: ''
  });

  // Get current user and check role
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      
      if (user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        setIsCoach(data?.role === 'coach');
      }
    };

    getCurrentUser();
  }, []);

  // Fetch shop items
  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      let query = supabase.from('shop_items').select('*');

      // Apply filters
      if (filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }
      if (filters.type !== 'All') {
        query = query.eq('type', filters.type);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'Newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'Most Purchased':
          query = query.order('purchase_count', { ascending: false });
          break;
        case 'Price ↑':
          query = query.order('price', { ascending: true });
          break;
        case 'Price ↓':
          query = query.order('price', { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Cast the data to match our ShopItem interface
      const typedItems = (data || []).map(item => ({
        ...item,
        category: item.category as 'Fitness' | 'Nutrition' | 'Mental Health',
        type: item.type as 'Program' | 'Product'
      }));
      
      setItems(typedItems);
    } catch (error) {
      console.error('Error fetching shop items:', error);
      toast({
        title: "Error",
        description: "Failed to load shop items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Coach-only handlers
  const handleAddItem = () => {
    if (!isCoach) return;
    setEditingItem(null);
    setIsAddModalOpen(true);
  };

  const handleEditItem = (item: ShopItem) => {
    if (!isCoach) return;
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!isCoach) return;
    
    if (!confirm('Are you sure you want to remove this item? This will not affect clients who have already purchased it.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('shop_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item removed successfully",
      });
      
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const handleSaveItem = async (itemData: Partial<ShopItem>) => {
    if (!isCoach) return;
    
    try {
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('shop_items')
          .update(itemData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Item updated successfully",
        });
      } else {
        // Create new item - ensure required fields are present
        const newItemData = {
          title: itemData.title!,
          description: itemData.description,
          category: itemData.category!,
          type: itemData.type!,
          price: itemData.price || 0,
          tags: itemData.tags || [],
          image_urls: itemData.image_urls || [],
          created_by: currentUser?.id
        };

        const { error } = await supabase
          .from('shop_items')
          .insert([newItemData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Item added successfully",
        });
      }

      setIsAddModalOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ShopHeader />
        
        <ShopFilters 
          filters={filters}
          onFiltersChange={setFilters}
        />
        
        <ShopGrid
          items={items}
          loading={loading}
          isCoach={isCoach}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
        
        {/* Coach-only floating action button */}
        {isCoach && (
          <AddItemFAB onClick={handleAddItem} />
        )}
        
        {/* Coach-only add/edit modal */}
        {isCoach && (
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveItem}
            editingItem={editingItem}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;
