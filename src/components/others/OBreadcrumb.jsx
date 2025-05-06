"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/core"
import { useRecoilState } from "recoil"
import { selectedCategory, selectedSubcategory } from "../../recoil/state"

export default function OBreadcrumb() {
  const [catSelected, setCat] = useRecoilState(selectedCategory)
  const [subcatSelected, setSubcat] = useRecoilState(selectedSubcategory)

  return (
    <Breadcrumb
      spacing="6px"
      fontWeight="medium"
      fontSize="md"
      separator={<Icon color="bluex.400" name="chevron-right" />}
    >
      <BreadcrumbItem isCurrentPage={catSelected === "all"}>
        <BreadcrumbLink
          onClick={() => {
            setCat("all")
            setSubcat("all")
          }}
        >
          Todos los productos
        </BreadcrumbLink>
      </BreadcrumbItem>

      {catSelected !== "all" && (
        <BreadcrumbItem isCurrentPage={subcatSelected === "all"}>
          <BreadcrumbLink onClick={() => setSubcat("all")} textTransform="capitalize">
            {catSelected}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {subcatSelected !== "all" && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink textTransform="capitalize">{subcatSelected}</BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  )
}
