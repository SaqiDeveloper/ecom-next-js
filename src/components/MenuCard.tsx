import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export const MenuCard = ({ title, description, buttonLabel, href }: Props) => {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button className="w-full">{buttonLabel}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};