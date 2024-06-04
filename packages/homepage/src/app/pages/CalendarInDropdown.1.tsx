export default function CalendarInDropdown() {
  return (
    <>
      <Dialog targetLabel="Open calendar" type="flyout">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </Dialog>
      <p>Selected Date is: {selected?.toISOString()}</p>
    </>
  );
}
