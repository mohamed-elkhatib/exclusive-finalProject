
import React from "react";

export default function CategoryDetails({
   params: { catsId },
 }: {
   params: { catsId: string };
}) {

  console.log(catsId);
  return <div>Category ID</div>;
}
