/**
 * Clipster-style earnings: views × payout rate per unit.
 * Example: $1,500 / 1M views × 300k views = $450
 */
export function calculateCampaignEarnings(
  views: number,
  payRate: number,
  payUnit: string,
): number {
  const unit = payUnit.toUpperCase().replace(/\s+/g, '');

  if (
    unit.includes('1M') ||
    unit.includes('1000000') ||
    unit === 'PER_MILLION_VIEWS' ||
    unit === 'MILLION_VIEWS'
  ) {
    return (views / 1_000_000) * payRate;
  }

  if (unit === 'CPM' || unit.includes('1K') || unit.includes('1000')) {
    return (views / 1000) * payRate;
  }

  if (unit === 'VIEW' || unit === 'PERVIEW' || unit === 'PER_VIEW') {
    return views * payRate;
  }

  return 0;
}

export function formatPayRate(payRate: number, payUnit: string): string {
  const unit = payUnit.toUpperCase().replace(/\s+/g, '');

  if (
    unit.includes('1M') ||
    unit.includes('1000000') ||
    unit === 'PER_MILLION_VIEWS' ||
    unit === 'MILLION_VIEWS'
  ) {
    return `$${payRate.toLocaleString('en-US')} / 1M views`;
  }

  if (unit === 'CPM' || unit.includes('1K') || unit.includes('1000')) {
    return `$${payRate.toLocaleString('en-US')} / 1K views`;
  }

  return `$${payRate.toLocaleString('en-US')} / ${payUnit.replace(/_/g, ' ').toLowerCase()}`;
}

export function parseRequirementItems(
  requirements: string,
  requirementItems?: string[] | null,
): string[] {
  if (requirementItems?.length) {
    return requirementItems;
  }

  return requirements
    .split(/\||•|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatCampaignStatus(status: string): string {
  return status
    .toLowerCase()
    .split('_')
    .join(' ');
}

export function formatViewsShort(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(views % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(views % 1_000 === 0 ? 0 : 1)}k`;
  }
  return views.toLocaleString('en-US');
}

export function formatEarningsFormula(
  payRate: number,
  payUnit: string,
  views: number,
): string {
  const rateLabel = formatPayRate(payRate, payUnit);
  const viewsLabel = formatViewsShort(views);
  const earnings = calculateCampaignEarnings(views, payRate, payUnit);
  return `${rateLabel} × ${viewsLabel} views = $${earnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getCampaignStatusVariant(
  status: string,
): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case 'ACTIVE':
      return 'default';
    case 'PAYMENT_PROCESSING':
      return 'secondary';
    case 'PAUSED':
      return 'outline';
    case 'COMPLETED':
    case 'INACTIVE':
    case 'DRAFT':
    default:
      return 'outline';
  }
}
