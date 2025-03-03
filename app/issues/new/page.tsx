import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="ex: We have some bugs" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="ex: We have some bugs in the system that need to be fixed"
        />
      </div>
      <div className="space-x-4 text-right">
        <Button variant="outline">Cancel</Button>
        <Button>Create Issue</Button>
      </div>
    </div>
  );
};

export default NewIssuePage;
