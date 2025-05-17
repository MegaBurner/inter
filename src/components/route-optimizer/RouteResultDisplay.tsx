import type { OptimizeRouteOutput } from '@/ai/flows/optimize-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Route, Info } from 'lucide-react';

interface RouteResultDisplayProps {
  result: OptimizeRouteOutput;
}

export default function RouteResultDisplay({ result }: RouteResultDisplayProps) {
  return (
    <Card className="shadow-lg bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <CheckCircle size={24} /> Optimized Route Found!
        </CardTitle>
        <CardDescription>
          Here's the suggested accessible route based on your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-lg mb-1 flex items-center gap-2"><Route size={20}/>Route Details:</h4>
          <p className="text-muted-foreground whitespace-pre-wrap">{result.routeDescription}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold mb-1 flex items-center gap-2"><Clock size={18}/>Estimated Time:</h4>
                <p className="text-muted-foreground">{result.estimatedTime}</p>
            </div>
            <div>
                <h4 className="font-semibold mb-1 flex items-center gap-2"><Info size={18}/>Distance:</h4>
                <p className="text-muted-foreground">{result.distance}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
