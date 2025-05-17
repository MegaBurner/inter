import type { OccupancyLevel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OccupancyStatusBadgeProps {
  level: OccupancyLevel;
}

export default function OccupancyStatusBadge({ level }: OccupancyStatusBadgeProps) {
  const statusMap: Record<OccupancyLevel, { text: string; className: string }> = {
    low: { text: 'Not Crowded', className: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-700/30 dark:text-green-300 dark:border-green-600' },
    medium: { text: 'Moderately Crowded', className: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-700/30 dark:text-yellow-300 dark:border-yellow-600' },
    high: { text: 'Crowded', className: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-700/30 dark:text-red-300 dark:border-red-600' },
    unknown: { text: 'Unknown', className: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600' },
  };

  const { text, className } = statusMap[level] || statusMap.unknown;

  return <Badge variant="outline" className={cn("font-semibold py-1 px-2.5", className)}>{text}</Badge>;
}
