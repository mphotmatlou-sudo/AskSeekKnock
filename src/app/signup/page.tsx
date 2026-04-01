
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chrome, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Logo } from '@/components/logo';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    gender: z.string().min(1, { message: 'Please select a gender.' }),
    age: z.coerce.number().min(13, { message: 'You must be at least 13 years old.' }),
    country: z.string().min(2, { message: 'Please enter your country.' }),
    city: z.string().min(2, { message: 'Please enter your city.' }),
    homeLanguage: z.string().min(2, { message: 'Please enter your home language.' }),
    churchName: z.string().min(2, { message: 'Please enter your church name.' }),
    denomination: z.string().min(2, { message: 'Please enter your denomination.' }),
});

export default function SignupPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            gender: '',
            age: undefined,
            country: '',
            city: '',
            homeLanguage: '',
            churchName: '',
            denomination: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Sign up successful:', values);
        toast({
            title: 'Sign Up Successful!',
            description: 'Welcome! You can now log in with your credentials.',
        });
    }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/50 p-4 relative py-12">
      <div className="absolute top-8 left-8 hidden md:block">
        <Logo />
      </div>

      <div className="w-full max-w-lg space-y-4">
        <Link href="/landing">
          <Button variant="ghost" size="sm" className="mb-2 group hover:bg-primary/5">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <Card className="border-none shadow-blocksy-xl animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blocksy-heading">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="name@example.com" {...field} className="rounded-blocksy-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} className="rounded-blocksy-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="rounded-blocksy-md">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 25" {...field} className="rounded-blocksy-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., United States" {...field} className="rounded-blocksy-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., New York" {...field} className="rounded-blocksy-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="homeLanguage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Home Language</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., English" {...field} className="rounded-blocksy-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="churchName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name of Church</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., The Community Church" {...field} className="rounded-blocksy-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="denomination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Denomination</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Non-denominational, Baptist" {...field} className="rounded-blocksy-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full rounded-blocksy-md shadow-blocksy font-bold">
                        Create Account
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-blocksy-md">
                        <Chrome className="mr-2 h-4 w-4" />
                        Sign up with Google
                    </Button>
                </form>
            </Form>
             <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline font-semibold text-primary hover:text-primary/80 transition-colors">
                    Login
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
