import { Tabs, Tab } from "@mui/material";
import router from "next/router";
import React from "react";
import { Category } from "../../services/NetworkServiceInterface";
import { gray } from "../../utils/colors";

interface Props {
  categories: Category[];
  currentCategory: Category;
}

export default function CategoryTabs(props: Props) {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    props.currentCategory
  );

  return (
    <Tabs
      value={selectedCategory.id}
      sx={{ background: gray }}
      onChange={async (e, v) => {
        const category = props.categories.find((c) => c.id === v);
        if (category) {
          setSelectedCategory(category);
          router.push(`/category/${category.id}`);
        }
      }}
    >
      {props.categories.map((category, index) => (
        <Tab
          label={category.name}
          key={`category-${category.id}`}
          value={category.id}
        />
      ))}
    </Tabs>
  );
}
