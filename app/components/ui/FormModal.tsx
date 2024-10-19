import React from "react";

interface FormModalProps<T> {
  title: string;
  formData: T;
  renderFields: (
    formData: T,
    handleChange: (field: keyof T, value: string | File) => void
  ) => React.ReactNode;
  onCancel: () => void;
  onSave: () => void;
  handleChange?: (field: keyof T, value: string | File) => void;
}

const FormModal = <T extends {}>({
  title,
  formData,
  renderFields,
  onCancel,
  onSave,
  handleChange,
}: FormModalProps<T>) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-lg w-96">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {handleChange && renderFields(formData, handleChange)}
      <div className="flex justify-end mt-4">
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
        >
          Cancel
        </button>
        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Save
        </button>
      </div>
    </div>
  </div>
);

export default FormModal;
