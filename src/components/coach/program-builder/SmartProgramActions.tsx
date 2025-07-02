
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Calendar, Trash2, Copy, UserMinus, ShoppingCart } from 'lucide-react';
import { Program } from '@/hooks/useProgramList';

interface SmartProgramActionsProps {
  program: Program;
  onView: (program: Program) => void;
  onEdit: (program: Program) => void;
  onDuplicate: (programId: string) => void;
  onAssign?: (program: Program) => void;
  onPublishToShop?: (program: Program) => void;
  onRemoveFromShop?: (programId: string) => void;
  onUnassign?: (programId: string) => void;
  onDelete?: (program: Program) => void;
  onScheduleReplacement?: (program: Program) => void;
}

export const SmartProgramActions = ({
  program,
  onView,
  onEdit,
  onDuplicate,
  onAssign,
  onPublishToShop,
  onRemoveFromShop,
  onUnassign,
  onDelete,
  onScheduleReplacement
}: SmartProgramActionsProps) => {
  const canDelete = program.state !== 'assigned' && program.state !== 'in_shop';
  const canAssign = program.state === 'saved';
  const canPublishToShop = program.state === 'saved';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Always available actions */}
        <DropdownMenuItem onClick={() => onView(program)}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(program)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(program.id)}>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </DropdownMenuItem>

        {/* State-specific actions */}
        {program.state === 'draft' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(program)}>
              📝 Resume Draft
            </DropdownMenuItem>
          </>
        )}

        {program.state === 'saved' && (
          <>
            <DropdownMenuSeparator />
            {canAssign && onAssign && (
              <DropdownMenuItem onClick={() => onAssign(program)}>
                <Calendar className="h-4 w-4 mr-2" />
                Assign to Client
              </DropdownMenuItem>
            )}
            {canPublishToShop && onPublishToShop && (
              <DropdownMenuItem onClick={() => onPublishToShop(program)}>
                🛒 Add to Shop
              </DropdownMenuItem>
            )}
          </>
        )}

        {program.state === 'assigned' && (
          <>
            <DropdownMenuSeparator />
            {onScheduleReplacement && (
              <DropdownMenuItem onClick={() => onScheduleReplacement(program)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Replacement
              </DropdownMenuItem>
            )}
            {onUnassign && (
              <DropdownMenuItem onClick={() => onUnassign(program.id)}>
                <UserMinus className="h-4 w-4 mr-2" />
                Unassign (if expired)
              </DropdownMenuItem>
            )}
          </>
        )}

        {program.state === 'in_shop' && (
          <>
            <DropdownMenuSeparator />
            {onRemoveFromShop && (
              <DropdownMenuItem onClick={() => onRemoveFromShop(program.id)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Remove from Shop
              </DropdownMenuItem>
            )}
          </>
        )}

        {/* Delete action (only for deletable programs) */}
        {canDelete && onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(program)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
