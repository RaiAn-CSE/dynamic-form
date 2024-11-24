import { useState } from "react";

const FormBuilder = () => {
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});

    const addField = () => {
        setFields([...fields, { id: Date.now(), type: "text", label: "" }]);
    };

    const updateField = (id, key, value) => {
        setFields((prev) =>
            prev.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    const removeField = (id) => {
        setFields((prev) => prev.filter((field) => field.id !== id));
    };

    const handleChange = (id, value) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Dynamic Form Builder</h2>
                <button
                    onClick={addField}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-6"
                >
                    Add Field
                </button>
                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.id} className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Label"
                                value={field.label}
                                onChange={(e) => updateField(field.id, "label", e.target.value)}
                                className="border p-2 rounded-md w-1/3"
                            />
                            <select
                                value={field.type}
                                onChange={(e) => updateField(field.id, "type", e.target.value)}
                                className="border p-2 rounded-md w-1/3"
                            >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="number">Number</option>
                            </select>
                            <button
                                onClick={() => removeField(field.id)}
                                className="px-3 py-2 bg-red-500 text-white rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    {fields.map((field) => (
                        <div key={field.id}>
                            <label className="block font-medium mb-1">
                                {field.label || "Unnamed Field"}
                            </label>
                            <input
                                type={field.type}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                className="border p-2 rounded-md w-full"
                                placeholder={`Enter ${field.label}`}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormBuilder;
