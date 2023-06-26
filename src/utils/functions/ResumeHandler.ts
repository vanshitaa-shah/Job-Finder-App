import { ChangeEvent } from "react";

export const handleResume = (
  e: ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<string | File | undefined>>
): void => {
  const file: File | undefined = e.target.files?.[0];
  const reader: FileReader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile(reader.result as string);
    };
  }
};
