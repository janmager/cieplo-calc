import { utils, writeFile } from "xlsx";

function generateExcelData(data: any) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Raport");
  const excelData = writeFile(workbook, `raport-${new Date().toLocaleDateString()}.xlsx`, {
    compression: true,
  });
  return excelData;
}

export default generateExcelData;
