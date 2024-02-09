import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { useForm } from 'react-hook-form';
import { createCollectionSchema, createCollectionSchemaType } from '@/schema/createCollection';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CollectionColor, CollectionColors } from '../lib/constants';
import { cn } from '../lib/utils';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { createCollection } from '../actions/collection';
import { toast } from './ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import sendEmail from '../actions/sendEmail';

interface Props {
    open: boolean;
    handleChange: (open: boolean) => void;
}

export default function CollectionSideBar({ open, handleChange }: Props) {
    const router = useRouter();
    const form = useForm<createCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {},
    });

    const onSubmit = async (data: createCollectionSchemaType) => {
        try {
            await createCollection(data);
            await sendEmail(data);
            openChangeWrapper(false);
            toast({
                title: "Success",
                description: "Collection created successfully!"
            })
            router.refresh();
        } catch (error: any) {
            console.log("Error creating collection", error);
            toast({
                title: "Error creating collection",
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    };

    const openChangeWrapper = (open: boolean) => {
        form.reset();
        handleChange(open);
    };

    return (
        <Sheet open={open} onOpenChange={openChangeWrapper}>
            <SheetContent>
                <SheetHeader className='flex justify-center items-center'>
                    <SheetTitle>Add Collection</SheetTitle>
                    <SheetDescription>Collections are a way to group your tasks.</SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Work/Personal/Family' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(color) => field.onChange(color)}>
                                            <SelectTrigger className={cn("w-full h-9 text-white", CollectionColors[field.value as CollectionColor])}>
                                                <SelectValue placeholder={"Select Color"} className='w-full h-8' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(CollectionColors).map(color => {
                                                    return (
                                                        <SelectItem key={color} value={color}
                                                            className={cn(
                                                                `w-full h-9 rounded-md my-1 focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white`,
                                                                CollectionColors[color as CollectionColor]
                                                            )}
                                                        >
                                                            {color}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <div className='flex flex-col gap-3 mt-8'>
                    <Separator />
                    <Button disabled={form.formState.isSubmitting} variant={"outline"} className={cn(form.watch("color") && CollectionColors[form.getValues("color") as CollectionColor])} onClick={form.handleSubmit(onSubmit)}>Confirm {form.formState.isSubmitting && (
                        <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
                    )}</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
