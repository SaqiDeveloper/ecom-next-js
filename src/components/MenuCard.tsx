"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
};

export const MenuCard = ({ title, description, buttonLabel, onClick }: Props) => {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full">
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};