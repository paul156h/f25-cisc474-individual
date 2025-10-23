import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@repo/ui/button';

export default function LoginButton() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <Button>Loading...</Button>;
  }

  return (
    <Button onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}
