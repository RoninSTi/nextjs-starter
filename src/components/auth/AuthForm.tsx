'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '@/lib/auth/auth';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type AuthFormProps = {
  mode: 'signin' | 'register';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Define form schemas
  const signInSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  });

  const registerSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  });

  // Use the appropriate schema based on mode
  const formSchema = mode === 'signin' ? signInSchema : registerSchema;

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({    
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: mode === 'register' ? '' : undefined,
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const result = await login(values.username, values.password);
        
        if (result?.error) {
          setError('Invalid username or password');
          return;
        }
        
        // Redirect to home page after successful login
        router.push('/');
        router.refresh();
      } else {
        // Register new user
        await register(values.username, values.email!, values.password);
        
        // After successful registration, log the user in
        const result = await login(values.username, values.password);
        
        if (result?.error) {
          setError('Registration successful, but failed to log in automatically. Please try logging in.');
          router.push('/auth/signin');
          return;
        }
        
        // Redirect to home page after successful registration and login
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'signin' 
            ? 'Enter your credentials below to access your account' 
            : 'Fill out the form below to create a new account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      disabled={loading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        disabled={loading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      disabled={loading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? 'Processing...'
                : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {mode === 'signin' ? (
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
              Register
            </Link>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}