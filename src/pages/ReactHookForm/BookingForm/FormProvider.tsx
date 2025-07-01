import Loader from '@/components/Loader/Loader';
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  DeepPartialSkipArrayKey,
  FieldErrors,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';

export type FormControllerProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onValidSubmit: (data: T) => void;
  onInvalidSubmit?: (errors?: FieldErrors<T>) => void;
  loading?: boolean;
  onChange?: (data: DeepPartialSkipArrayKey<T>) => void;
  onChangeField?: (name: keyof T, value?: any) => void;
} & PropsWithChildren;

const FormController = <T extends FieldValues>({
  children,
  methods,
  onValidSubmit,
  onInvalidSubmit,
  onChange,
  onChangeField,
  loading,
}: FormControllerProps<T>) => {
  // const validatingFormsContext = useContext(ValidatingFormsContext);
  // Important: the isLoading is only applicable to async defaultValues, see https://react-hook-form.com/docs/useform/formstate
  const { dirtyFields, isDirty, isLoading } = methods.formState;
  const [isRealyDirty, setIsRealyDirty] = useState(false);
  const uniqueKeyRef = useRef(`form-${crypto.randomUUID()}`);

  const loadingFormData = loading ?? isLoading;
  const { handleSubmit, control } = methods;

  const watchedValues = useWatch({ control });
  const values = onChangeField || onChange ? watchedValues : undefined;

  // const prevValues = useRef<DeepPartialSkipArrayKey<T> | undefined>(undefined);

  // useEffect(() => {
  //   if (!onChangeField || values === undefined) {
  //     return;
  //   }

  //   callCallbackOnEachFoundDiff(prevValues.current, values, onChangeField);

  //   prevValues.current = values;
  // }, [values, onChangeField]);

  useEffect(() => {
    if (!onChange || values === undefined) {
      return;
    }

    onChange(values);
  }, [values, onChange]);

  // useEffect(() => {
  //   setIsRealyDirty(isDirty && Object.keys(dirtyFields).length > 0);
  // }, [isDirty, dirtyFields]);

  // useEffect(() => {
  //   if (!isRealyDirty) {
  //     return;
  //   }

  //   validatingFormsContext?.setIsDirty(uniqueKeyRef.current, isRealyDirty);
  // }, [isRealyDirty]);

  // useEffect(() => {
  //   return () => {
  //     // On unmount, mark form as not dirty
  //     validatingFormsContext?.setIsDirty(uniqueKeyRef.current, false);
  //   };
  // }, []);

  return (
    <FormProvider<T> {...methods}>
      <form
        onSubmit={handleSubmit(
          data => {
            // Successful submit, mark form as not dirty
            // validatingFormsContext?.setIsDirty(uniqueKeyRef.current, false);
            onValidSubmit(data);
          },
          errors => {
            onInvalidSubmit && onInvalidSubmit(errors);
          }
        )}
        onReset={() => {
          // On reset, mark form as not dirty
          // validatingFormsContext?.setIsDirty(uniqueKeyRef.current, false);
        }}
        noValidate
        role="form"
        {...(loadingFormData ? { 'aria-busy': true } : {})}
        {...(loadingFormData ? { 'aria-describedby': 'loading-icon' } : {})}
      >
        {loadingFormData && <Loader id="loading-icon" />}
        {!loadingFormData && children}
      </form>
    </FormProvider>
  );
};

export default FormController;
