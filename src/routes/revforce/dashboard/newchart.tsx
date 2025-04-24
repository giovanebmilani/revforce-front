import LabelInput from "@/components/LabelInput";
import { SelectBox } from "@/components/SelectBox";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/revforce/dashboard/newchart")({
  component: RouteComponent,
});

function RouteComponent() {

  const handleCreateChart = () => {
    // Handle the chart creation logic here
    //chamar o useCreateChart e passar os dados necessários
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState("");
  const [dataDisplay, setDataDisplay] = useState("");
  return (
    <div className="flex flex-col w-full gap-3">
      <h2 className="text-gray-300">Dashboard /</h2>
      <h1 className="text-2xl font-semibold italic mb-3">New Chart</h1>

      <hr className="ml-[-32px] border-gray-200 w-full mt-2" />

      <LabelInput
        inputTitle="Title"
        props={{
          placeholder: "Title",
          className: "max-w-[180px]",
          value: title,
          onChange: (e) => setTitle(e.target.value),
        }}
      ></LabelInput>

      <section className="bg-gray-200 max-w-[180px] rounded-sm">
        <h2 className="font-semibold p-3">Charts</h2>
        <hr className="border-gray-300" />
        <div className="p-3">-Chamar carrousel-</div>
      </section>

      <div>
        <h3 className="font-medium">Data</h3>
        <SelectBox
          items={[{ value: 1, label: "teste" }]}
          selectLabel="Data Display"
          placeholderText="Select data to display in the chart..."
        ></SelectBox>
      </div>

      <LabelInput
        inputTitle="Description"
        props={{
          placeholder: "Description",
          className: "max-w-[180px]",
          value: description,
          onChange: (e) => setDescription(e.target.value),
        }}
      ></LabelInput>

      <div>
        <h3 className="font-medium">Filters</h3>
        <SelectBox
          items={[{ value: 1, label: "teste" }]}
          selectLabel="Filters"
          placeholderText="Filters"
        ></SelectBox>
      </div>

      <div className="flex flex-col mx-auto gap-3 justify-center md:flex-row md:mr-0 md:justify-end">
        <Button variant="secondaryPointer" className="w-50 md:w-35" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="pointer" className="w-50 md:w-35" onClick={() => {handleCreateChart}}>
          Create
        </Button>
      </div>
    </div>
  );
}
