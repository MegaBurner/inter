// Behalte deine vorhandenen Typen bei:
export type OccupancyLevel = 'low' | 'medium' | 'high' | 'unknown';

export interface StudySpace {
  id: string;
  name: string;
  location: string;
  occupancy: OccupancyLevel;
  capacity?: number;
  features?: string[];
}

export interface FavoriteLocation {
  id: string;
  name: string;
  category: string; // e.g., "Lecture Hall", "Study Room", "Office"
  icon?: React.ElementType; // For a specific icon if needed
}

// --- Angepasste AR Navigationstypen ---

/**
 * Definiert die möglichen Zustände während der AR-Navigation.
 * Diese werden in `page.tsx` verwendet, um das Verhalten und die UI zu steuern.
 */
export type ARStatus =
  | 'idle'                // Grundzustand, keine aktive Navigation oder Planung
  | 'prompt_destination'  // Zustand, in dem der Nutzer aufgefordert wird, ein Ziel einzugeben (aktuell nicht explizit in page.tsx genutzt, aber kann für Erweiterungen sinnvoll sein)
  | 'navigating'          // Aktive AR-Navigation zum Ziel
  | 'obstacle_alert'      // Ein Hindernis wurde erkannt
  | 'rerouting'           // Eine neue Route wird aufgrund eines Hindernisses berechnet
  | 'arrived';            // Der Nutzer hat das Ziel erreicht

/**
 * Beschreibt den gesamten Zustand der AR-Navigation.
 */
export interface ARNavigationState {
  status: ARStatus; // Verwendet den oben definierten, klareren Union-Typ
  destination?: string;
  accessibilityNeeds?: string; 
  currentInstruction?: string;
  obstacleMessage?: string;
  eta?: string;
}

// Du könntest auch andere Typen hier definieren, die in page.tsx oder anderen Teilen deiner App benötigt werden.