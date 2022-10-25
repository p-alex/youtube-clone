import { z } from 'zod';

export type ZodVerifyFormErrors<Data> = {
  [Property in keyof Data]?: string;
};

function useZodVerifyForm<Data>(schema: z.ZodSchema<Data>, data: Data) {
  const handleVerifyData = () => {
    const response = schema.safeParse(data);

    let errors: ZodVerifyFormErrors<Data> = {};

    if (!response.success) {
      const issues = response.error.issues;
      errors = issues.reduce((acc, error) => {
        Object.assign(acc, { [error.path[0]]: error.message });
        return acc;
      }, {});
    }

    return { isValid: response.success, errors };
  };

  return handleVerifyData;
}

export default useZodVerifyForm;
