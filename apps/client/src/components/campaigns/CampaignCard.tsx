import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, DollarSign, Target } from 'lucide-react';

interface CampaignCardProps {
    campaign: {
        id: number;
        title: string;
        description: string;
        image?: string;
        budget: number;
        payRate: number;
        payUnit: string;
        startDate: string;
        endDate: string;
        platforms: string[];
        status: string;
    };
    onJoin: (id: number) => void;
    isJoining?: boolean;
    isJoined?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
    campaign,
    onJoin,
    isJoining = false,
    isJoined = false
}) => {
    return (
        <Card className="overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 flex flex-col group">
            {campaign.image && (
                <Link href={`/dashboard/campaigns/${campaign.id}`} className="relative h-48 w-full overflow-hidden block">
                    <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                        {campaign.platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                {platform}
                            </Badge>
                        ))}
                    </div>
                </Link>
            )}

            <CardHeader className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/dashboard/campaigns/${campaign.id}`} className="hover:text-primary transition-colors">
                        <CardTitle className="text-xl font-bold text-foreground truncate">
                            {campaign.title}
                        </CardTitle>
                    </Link>
                    {!campaign.image && (
                        <div className="flex gap-1">
                            {campaign.platforms.map((platform) => (
                                <Badge key={platform} variant="outline" className="text-[10px] uppercase">
                                    {platform}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {campaign.description}
                </p>
            </CardHeader>

            <CardContent className="px-5 pb-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span>${campaign.payRate} / {campaign.payUnit.replace('PER_', '').toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4 text-secondary" />
                        <span>${campaign.budget} Budget</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0 border-t border-border mt-auto">
                <Button
                    onClick={() => onJoin(campaign.id)}
                    disabled={isJoining || isJoined}
                    className="w-full shadow-lg"
                    variant={isJoined ? "outline" : "default"}
                >
                    {isJoining ? 'Joining...' : isJoined ? 'Already Joined' : 'Join Campaign'}
                </Button>
            </CardFooter>
        </Card>
    );
};
