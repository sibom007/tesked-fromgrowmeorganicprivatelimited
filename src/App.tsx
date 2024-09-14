import { useEffect, useRef, useState } from "react";

import { Prodect } from "./type/Type";

import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [Input, setInput] = useState<string>("");
  const op = useRef<OverlayPanel>(null);

  const [MainData, setMainData] = useState<Prodect[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 12,
    page: 1,
  });

  const [selectedProducts, setSelectedProducts] = useState<Prodect[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    const loadArtworks = async (page: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${lazyState.rows}`
        );
        const data = await res.json();
        setMainData(data.data);
        setTotalRecords(data.pagination.total);

        const updatedSelections = data.data.filter((product: Prodect) =>
          selectedProductIds.includes(product.id)
        );
        setSelectedProducts((prevSelected) => [
          ...prevSelected.filter(
            (product) => !selectedProductIds.includes(product.id)
          ),
          ...updatedSelections,
        ]);
      } catch (error) {
        console.error("Error fetching artworks =>", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks(lazyState.page);
  }, [lazyState.page, lazyState.rows, selectedProductIds]);

  const onPage = (event: DataTableStateEvent) => {
    setLazyState({
      first: event.first,
      rows: event.rows,
      page: event.page! + 1,
    });
  };

  const selectRows = async () => {
    const totalToSelect = Number(Input);
    const currentSelected = [...selectedProducts];
    let currentPage = lazyState.page;
    let totalFetchedData = [...MainData];

    for (
      let i = 0;
      i < MainData.length && currentSelected.length < totalToSelect;
      i++
    ) {
      if (!selectedProductIds.includes(MainData[i].id)) {
        currentSelected.push(MainData[i]);
      }
    }

    while (currentSelected.length < totalToSelect) {
      currentPage++;
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${currentPage}`
      );
      const data = await res.json();

      totalFetchedData = [...totalFetchedData, ...data.data];

      for (
        let i = 0;
        i < data.data.length && currentSelected.length < totalToSelect;
        i++
      ) {
        if (!selectedProductIds.includes(data.data[i].id)) {
          currentSelected.push(data.data[i]);
        }
      }
    }

    setMainData(totalFetchedData);
    setSelectedProducts(currentSelected);
    setSelectedProductIds(currentSelected.map((product) => product.id));

    setLazyState({
      ...lazyState,
      page: lazyState.page,
    });
  };

  return (
    <div style={{ backgroundColor: "black", width: "100%", height: "100%" }}>
      <OverlayPanel ref={op}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <InputText
            value={Input}
            onChange={(e) => setInput(e.target.value)}
            type="number"
            placeholder="Select Number"
          />
          <Button type="submit" size="small" onClick={selectRows}>
            Submit
          </Button>
        </div>
      </OverlayPanel>

      <DataTable
        value={MainData}
        lazy
        paginator
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={totalRecords}
        onPage={onPage}
        loading={loading}
        tableStyle={{ minWidth: "50rem" }}
        style={{ overflowX: "auto" }}
        selectionMode="multiple"
        selection={selectedProducts.filter((product) =>
          MainData.some((data) => data.id === product.id)
        )}
        onSelectionChange={(e: { value: Prodect[] }) => {
          const selected = e.value;

          setSelectedProducts((prevSelected) => {
            // const selectedIds = selected.map((product) => product.id);
            const filteredPrevSelected = prevSelected.filter(
              (product) => !MainData.some((data) => data.id === product.id)
            );
            return [...filteredPrevSelected, ...selected];
          });

          setSelectedProductIds((prevIds) => {
            const newIds = selected.map((product) => product.id);
            const filteredPrevIds = prevIds.filter(
              (id) => !MainData.some((data) => data.id === id)
            );
            return [...filteredPrevIds, ...newIds];
          });
        }}>
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}></Column>
        <Column
          exportable={false}
          headerStyle={{ width: "4rem", minWidth: "4rem" }}
          header={() => (
            <Button
              onClick={(e) => op.current?.toggle(e)}
              size="small"
              icon="pi pi-angle-down"
              style={{
                backgroundColor: "#f9fafb",
                color: "black",
                border: "none",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            />
          )}
        />
        <Column field="title" header="Title" style={{ width: "20%" }}></Column>
        <Column
          field="place_of_origin"
          header="Country"
          style={{ width: "15%" }}></Column>
        <Column
          field="artist_display"
          header="Artist"
          style={{ width: "40%" }}></Column>
        <Column
          field="inscriptions"
          header="Inscriptions"
          style={{ width: "40%" }}></Column>
        <Column
          field="date_start"
          header="Start Date"
          style={{ width: "15%" }}></Column>
        <Column
          field="date_end"
          header="End Date"
          style={{ width: "15%" }}></Column>
      </DataTable>
    </div>
  );
};

export default App;
