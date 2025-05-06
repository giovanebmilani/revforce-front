import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Item {
  id: string;
  content: React.ReactNode;
}

interface DraggableListProps {
  initialItems: Item[];
  direction?: "horizontal" | "vertical" | "auto";
  className?: string;
  itemClassName?: string;
  onOrderChange?: (newOrder: string[]) => void;
}

const SortableItem: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? "shadow-lg" : ""}`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export const DraggableList: React.FC<DraggableListProps> = ({
  initialItems,
  direction = "auto",
  className = "",
  itemClassName = "",
  onOrderChange,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null); 

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = currentItems.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          console.warn("Could not find dragged items during reorder.");
          return currentItems; 
        }

        const newItems = arrayMove(currentItems, oldIndex, newIndex);

        if (onOrderChange) {
          onOrderChange(newItems.map((item) => item.id));
        }
        return newItems;
      });
    }
  };

  const actualDirection =
    direction === "auto"
      ? containerWidth > 600
        ? "horizontal"
        : "vertical"
      : direction;

  const sortingStrategy =
    actualDirection === "horizontal"
      ? horizontalListSortingStrategy
      : verticalListSortingStrategy;

  const itemIds = items.map((item) => item.id);

  return (
    <div
      ref={containerRef}
      className={`${className} ${
        actualDirection === "horizontal"
          ? "flex flex-row flex-wrap gap-4 w-full"
          : "flex flex-col gap-4"
      }`}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={itemIds} strategy={sortingStrategy}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              className={`${itemClassName} cursor-grab active:cursor-grabbing`}
            >
              {item.content}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
