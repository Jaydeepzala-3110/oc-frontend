import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, DollarSign, Target } from 'lucide-react';
import {
  formatPayRate,
  formatCampaignStatus,
  getCampaignStatusVariant,
} from '@/lib/campaign-earnings';

interface CampaignCardProps {
    campaign: {
        id: number;
        title: string;
        description: string;
        image?: string;
        budget: number;
        payRate: number;
        payUnit: string;
        payRateLabel?: string;
        startDate: string;
        endDate: string;
        platforms: string[];
        status: string;
        canJoin?: boolean;
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
    const payLabel = campaign.payRateLabel ?? formatPayRate(campaign.payRate, campaign.payUnit);
    const canJoin = campaign.canJoin ?? campaign.status === 'ACTIVE';
    const joinDisabled = isJoining || isJoined || !canJoin;

    const joinLabel = isJoining
        ? 'Joining...'
        : isJoined
            ? 'Already Joined'
            : canJoin
                ? 'Join Campaign'
                : 'Not Open to Join';

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
                        <Badge variant={getCampaignStatusVariant(campaign.status)} className="bg-background/80 backdrop-blur-sm capitalize">
                            {formatCampaignStatus(campaign.status)}
                        </Badge>
                        {campaign.platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                {platform}
                            </Badge>
                        ))}
                    </div>
                </Link>
            )}

            <CardHeader className="p-5">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <Link href={`/dashboard/campaigns/${campaign.id}`} className="hover:text-primary transition-colors min-w-0">
                        <CardTitle className="text-xl font-bold text-foreground truncate">
                            {campaign.title}
                        </CardTitle>
                    </Link>
                    {!campaign.image && (
                        <div className="flex flex-wrap gap-1 justify-end">
                            <Badge variant={getCampaignStatusVariant(campaign.status)} className="text-[10px] capitalize">
                                {formatCampaignStatus(campaign.status)}
                            </Badge>
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
                        <DollarSign className="h-4 w-4 text-primary shrink-0" />
                        <span>{payLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4 text-secondary shrink-0" />
                        <span>${campaign.budget.toLocaleString('en-US')} Budget</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
                        <Calendar className="h-4 w-4 text-accent shrink-0" />
                        <span>
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0 border-t border-border mt-auto">
                <Button
                    onClick={() => onJoin(campaign.id)}
                    disabled={joinDisabled}
                    className="w-full shadow-lg"
                    variant={isJoined ? "outline" : canJoin ? "default" : "secondary"}
                >
                    {joinLabel}
                </Button>
            </CardFooter>
        </Card>
    );
};
