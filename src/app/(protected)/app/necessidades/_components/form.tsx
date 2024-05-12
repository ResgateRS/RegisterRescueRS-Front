"use client";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "@/api/authenticate";
import { AddShelterNeedsRequest, addShelterNeeds } from "@/api/add-shelter-needs";
import { toast } from "sonner";

const formSchema = z.object({
  acceptingUnsheltered: z.boolean(),
  acceptingVolunteers: z.boolean(),
  acceptingDoctors: z.boolean(),
  acceptingVeterinary: z.boolean(),
  formLink: z.string().optional(),
  donationsDescription: z.string().optional(),
});

function NeedsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptingUnsheltered: false,
      acceptingVolunteers: false,
      acceptingDoctors: false,
      acceptingVeterinary: false,
      formLink: "",
      donationsDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formRequest: AddShelterNeedsRequest = {
      shelterId: "1",
      acceptingVolunteers: values.acceptingVolunteers,
      acceptingDoctors: values.acceptingDoctors,
      acceptingVeterinarians: values.acceptingVeterinary,
      acceptingDonations: values.donationsDescription !== "",
      donationDescription: values.donationsDescription,
      volunteersSubscriptionLink: values.formLink,
    }
    const { message, result } = await addShelterNeeds(formRequest)
    console.log(message, result)
    if (result === 1) {
      form.reset()
      toast.success('Necessidades inseridas com sucesso')
    } else {
      toast.error('Houve um erro ao inserir necessidades')
      return
    }
  }

  function renderCheckbox({ field }: any) {
    return (
      <FormItem>
        <FormControl>
          <Input id={field.name ?? ''} type="checkbox" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  function renderFormLink({ field }: any) {
    return (
      <FormItem>
        <FormControl>
          <Input
            id={field.name ?? ''}
            placeholder="Link do formulário (opcional)"
            type="text"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  function renderDonationsDescription({ field }: any) {
    return (
      <FormItem>
        <FormControl>
          <Textarea id={field.name} className='resize-none' type="text" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="acceptingUnsheltered"
                render={renderCheckbox}
              />
              <Label htmlFor="acceptingUnsheltered">
                Aceitando desabrigados
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="acceptingVolunteers"
                render={renderCheckbox}
              />
              <Label htmlFor="acceptingVolunteers">Aceitando voluntários</Label>
            </div>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="acceptingDoctors"
                render={renderCheckbox}
              />
              <Label htmlFor="acceptingDoctors">Aceitando médicos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="acceptingVeterinary"
                render={renderCheckbox}
              />
              <Label htmlFor="acceptingVeterinary">
                Aceitando veterinários
              </Label>
            </div>
          </div>
        </div>
        <div className="grid items-left space-y-2">
          <FormField
            control={form.control}
            name="formLink"
            render={renderFormLink}
          />
          <div className="grid w-full gap-1.5">
            <Label htmlFor="donationsDescription">Descrição das Doações</Label>
            <FormField
              control={form.control}
              name="donationsDescription"
              render={renderDonationsDescription}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className={cn(
              buttonVariants({ variant: "default" }),
              "text-md mt-2 uppercase"
            )}
          >
            SALVAR
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NeedsForm;
