import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          View and manage your account details
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
