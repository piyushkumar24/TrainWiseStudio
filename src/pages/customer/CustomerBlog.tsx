import React, { useState, useMemo } from 'react';
import { Search, ArrowLeft, Calendar, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveBlogPostReader } from '@/components/customer/blog/ResponsiveBlogPostReader';

interface BlogPost {
  id: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Health';
  tags: string[];
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  author: string;
  readTime: string;
}

const CustomerBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const dummyBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Structure Your First Workout Week',
      category: 'Fitness',
      tags: ['#WorkoutTips', '#Beginner', '#Programming'],
      date: '2025-05-12',
      excerpt: 'Starting a new program? Here\'s how to structure your week for balance and recovery.',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      content: `
        <h2>Getting Started with Your Fitness Journey</h2>
        <p>Starting a new workout program can feel overwhelming, but with the right structure, you'll set yourself up for success. Here's a comprehensive guide to planning your first workout week.</p>
        
        <h3>Day 1-2: Upper Body Focus</h3>
        <p>Begin with compound movements like push-ups, pull-ups, and dumbbell rows. These exercises work multiple muscle groups and provide the foundation for strength building.</p>
        
        <h3>Day 3: Active Recovery</h3>
        <p>Don't underestimate the power of rest. Light walking, stretching, or yoga will help your muscles recover while keeping you active.</p>
        
        <h3>Day 4-5: Lower Body & Core</h3>
        <p>Squats, lunges, and planks should be your go-to exercises. Focus on proper form over heavy weights when starting out.</p>
        
        <h3>Weekend: Flexibility & Fun</h3>
        <p>Try a new activity like hiking, swimming, or dancing. Exercise should be enjoyable, not just effective.</p>
        
        <p>Remember: consistency beats perfection. Start with 20-30 minute sessions and gradually increase as your fitness improves.</p>
      `,
      author: 'Sarah Johnson',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Macros 101: Understanding Nutrition Basics',
      category: 'Nutrition',
      tags: ['#Macros', '#HealthyEating', '#Nutrition'],
      date: '2025-06-01',
      excerpt: 'Proteins, fats, and carbs explained. Learn how to track what matters.',
      coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
      content: `
        <h2>Understanding Macronutrients</h2>
        <p>Macronutrients are the three main components of food that provide energy: proteins, carbohydrates, and fats. Understanding how they work can transform your approach to nutrition.</p>
        
        <h3>Proteins: The Building Blocks</h3>
        <p>Aim for 0.8-1.2g per kg of body weight daily. Proteins help build and repair muscle tissue, making them essential for recovery and growth.</p>
        <ul>
          <li>Lean meats, fish, eggs</li>
          <li>Legumes and beans</li>
          <li>Greek yogurt and cottage cheese</li>
        </ul>
        
        <h3>Carbohydrates: Your Energy Source</h3>
        <p>Complex carbs provide sustained energy throughout the day. Choose whole grains, fruits, and vegetables over processed options.</p>
        
        <h3>Fats: Essential for Health</h3>
        <p>Don't fear healthy fats! They're crucial for hormone production and nutrient absorption. Include avocados, nuts, and olive oil in your diet.</p>
        
        <h3>Getting Started with Tracking</h3>
        <p>Start by tracking one macro at a time. Most people benefit from focusing on protein first, then adjusting carbs and fats based on their goals.</p>
      `,
      author: 'Michael Chen',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Why Breathing Techniques Reduce Anxiety',
      category: 'Mental Health',
      tags: ['#Mindfulness', '#Breathwork', '#AnxietyRelief'],
      date: '2025-04-25',
      excerpt: 'Breathing exercises can calm your nervous system. Here\'s how.',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      content: `
        <h2>The Science of Breathwork</h2>
        <p>Your breath is one of the most powerful tools for managing stress and anxiety. When we're anxious, our breathing becomes shallow and rapid, which can actually make anxiety worse.</p>
        
        <h3>The 4-7-8 Technique</h3>
        <p>This simple technique can help you feel calmer in just a few minutes:</p>
        <ol>
          <li>Inhale through your nose for 4 counts</li>
          <li>Hold your breath for 7 counts</li>
          <li>Exhale through your mouth for 8 counts</li>
          <li>Repeat 3-4 times</li>
        </ol>
        
        <h3>Box Breathing</h3>
        <p>Used by Navy SEALs and elite athletes, box breathing helps you stay calm under pressure:</p>
        <ul>
          <li>Inhale for 4 counts</li>
          <li>Hold for 4 counts</li>
          <li>Exhale for 4 counts</li>
          <li>Hold empty for 4 counts</li>
        </ul>
        
        <h3>Daily Practice Tips</h3>
        <p>Start with just 2-3 minutes daily. The key is consistency, not duration. Practice during calm moments so the technique is ready when you need it most.</p>
        
        <p>Remember: breathwork takes practice. Be patient with yourself as you develop this valuable skill.</p>
      `,
      author: 'Dr. Lisa Rodriguez',
      readTime: '6 min read'
    },
    {
      id: '4',
      title: 'Pre-Workout Nutrition: Fuel Your Performance',
      category: 'Nutrition',
      tags: ['#PreWorkout', '#Performance', '#Energy'],
      date: '2025-05-28',
      excerpt: 'What to eat before training to maximize your energy and performance.',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      content: `
        <h2>Timing Your Pre-Workout Nutrition</h2>
        <p>What you eat before training can make or break your workout. Here's how to fuel your body for optimal performance.</p>
        
        <h3>2-3 Hours Before: The Full Meal</h3>
        <p>If you have time, eat a balanced meal with complex carbs, lean protein, and minimal fat. This gives your body time to digest and convert food into usable energy.</p>
        
        <h3>30-60 Minutes Before: Quick Energy</h3>
        <p>When you're short on time, focus on easily digestible carbs:</p>
        <ul>
          <li>Banana with a small amount of nut butter</li>
          <li>Oatmeal with berries</li>
          <li>Greek yogurt with honey</li>
        </ul>
        
        <h3>Hydration is Key</h3>
        <p>Start hydrating 2-3 hours before your workout. Aim for 16-20 oz of water, and sip another 8 oz about 15 minutes before you start.</p>
        
        <h3>What to Avoid</h3>
        <p>Skip high-fat or high-fiber foods right before training, as they can cause digestive discomfort during your workout.</p>
      `,
      author: 'Sarah Johnson',
      readTime: '4 min read'
    },
    {
      id: '5',
      title: 'Building Mental Resilience Through Exercise',
      category: 'Mental Health',
      tags: ['#Resilience', '#Exercise', '#Mindset'],
      date: '2025-06-15',
      excerpt: 'How physical training builds mental strength and emotional resilience.',
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
      content: `
        <h2>The Mind-Body Connection</h2>
        <p>Exercise isn't just about physical fitness – it's one of the most powerful tools for building mental resilience and emotional strength.</p>
        
        <h3>Stress Inoculation</h3>
        <p>When you push through a challenging workout, you're teaching your brain that you can handle difficult situations. This translates to better stress management in daily life.</p>
        
        <h3>The Confidence Cycle</h3>
        <p>Every workout you complete builds evidence that you can stick to commitments and overcome obstacles. This creates a positive feedback loop of self-confidence.</p>
        
        <h3>Neurochemical Benefits</h3>
        <p>Exercise releases endorphins, serotonin, and BDNF (brain-derived neurotrophic factor), which improve mood and cognitive function.</p>
        
        <h3>Practical Applications</h3>
        <ul>
          <li>Use workouts as stress relief after difficult days</li>
          <li>Set small, achievable fitness goals to build momentum</li>
          <li>Practice mindfulness during exercise to enhance benefits</li>
        </ul>
        
        <p>Remember: the mental benefits of exercise often outlast the physical ones. You're not just building muscle – you're building resilience.</p>
      `,
      author: 'Dr. Lisa Rodriguez',
      readTime: '5 min read'
    },
    {
      id: '6',
      title: 'Progressive Overload: The Key to Continuous Growth',
      category: 'Fitness',
      tags: ['#ProgressiveOverload', '#Strength', '#Growth'],
      date: '2025-06-10',
      excerpt: 'Understanding how to progressively challenge your body for continuous improvement.',
      coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop',
      content: `
        <h2>What is Progressive Overload?</h2>
        <p>Progressive overload is the gradual increase of stress placed on the body during exercise. It's the fundamental principle behind all fitness improvements.</p>
        
        <h3>Methods of Progression</h3>
        <p>There are several ways to apply progressive overload:</p>
        <ul>
          <li><strong>Increase Weight:</strong> Add more resistance to your exercises</li>
          <li><strong>Increase Reps:</strong> Perform more repetitions with the same weight</li>
          <li><strong>Increase Sets:</strong> Add more sets to your workout</li>
          <li><strong>Improve Form:</strong> Focus on better technique and range of motion</li>
          <li><strong>Decrease Rest:</strong> Reduce rest periods between sets</li>
        </ul>
        
        <h3>The 2.5% Rule</h3>
        <p>Aim to increase your training load by about 2.5% each week. This might mean adding 2.5lbs to your squat or doing one extra rep per set.</p>
        
        <h3>Tracking Your Progress</h3>
        <p>Keep a workout log to track your improvements. Without data, it's impossible to know if you're truly progressing.</p>
        
        <h3>When to Deload</h3>
        <p>Every 4-6 weeks, consider a deload week where you reduce volume by 40-50%. This allows your body to recover and come back stronger.</p>
      `,
      author: 'Michael Chen',
      readTime: '6 min read'
    }
  ];

  const filteredPosts = useMemo(() => {
    let filtered = dummyBlogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All', icon: '📚' },
    { id: 'Fitness', label: 'Fitness', icon: '🏋️' },
    { id: 'Nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'Mental Health', label: 'Mental Health', icon: '🧠' },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            📝 Blog
          </h1>
          <p className="text-gray-600">
            Explore expert advice, tips, and insights from your coach.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search blog posts, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Category Tabs - Improved Layout */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-2 border border-gray-200">
            {/* Mobile: Horizontal scroll */}
            <div className="flex lg:hidden overflow-x-auto scrollbar-hide gap-2 pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                    whitespace-nowrap min-w-fit transition-all duration-200
                    ${selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-base">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* Desktop: Single row with proper spacing */}
            <div className="hidden lg:flex gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                    flex-1 justify-center transition-all duration-200 min-h-[44px]
                    ${selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-md transform scale-[1.02]'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-[1.01]'
                    }
                  `}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => setSelectedPost(post)}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-orange-50 text-orange-700 hover:bg-orange-100 px-2 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1"
                      >
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? `No posts match "${searchQuery}". Try different keywords.`
                : `No posts available in ${selectedCategory} category yet.`
              }
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="mt-2"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Responsive Blog Post Reader */}
      {selectedPost && (
        <ResponsiveBlogPostReader
          post={selectedPost}
          open={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default CustomerBlog;
