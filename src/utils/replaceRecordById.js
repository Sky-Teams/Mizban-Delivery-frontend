export const replaceRecordById = (records, id, updatedRecord) =>
  records.map((record) =>
    String(record.id) === String(id) ? updatedRecord : record,
  );
