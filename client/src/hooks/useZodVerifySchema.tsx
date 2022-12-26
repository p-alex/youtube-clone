import { useState } from 'react';
import { z } from 'zod';

export type ZodVerifyFormErrors<Data> = {
  [Property in keyof Data]?: string[];
};

function useZodVerifySchema<Data>(schema: z.ZodSchema<Data>, data: Data) {
  const [fieldErrors, setFieldErrors] = useState<ZodVerifyFormErrors<Data>>({});
  const verify = () => {
    setFieldErrors({});
    const response = schema.safeParse(data);
    if (!response.success) {
      const errors = response.error.flatten().fieldErrors as ZodVerifyFormErrors<Data>;
      setFieldErrors(errors);
      return false;
    }
    return true;
  };
  return { verify, fieldErrors };
}

export default useZodVerifySchema;
