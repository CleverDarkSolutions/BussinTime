import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Input} from '@/components/ui/input';
import LoginForm from '@/components/custom/welcome/login-form';
import RegisterForm from '@/components/custom/welcome/register-form';

export function AuthForm() {
  return (
    <Tabs defaultValue="login"
      className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password to log in. Click submit to continue.
            </CardDescription>
          </CardHeader>
          <LoginForm/>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Enter your email and set a password to register. Click submit to continue.
            </CardDescription>
          </CardHeader>
          <RegisterForm/>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AuthForm
