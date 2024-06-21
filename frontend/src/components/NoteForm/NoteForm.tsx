import { FC, useState } from 'react';
import styles from './NoteForm.module.scss';
import { useAppSelector } from '#hooks/redux';
import { Box, Button, Card, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { INoteCreateData } from '#interfaces/INote';
import MultipleSelectUI from '#components/UI/MultipleSelectUI/MultipleSelectUI';
import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { labelAPI } from '#services/LabelService';
import { noteAPI } from '#services/NoteService';

const NoteForm: FC = () => {
    const { coordinates } = useAppSelector((state) => state.note);

    const { data: labels, error, isLoading } = labelAPI.useFetchLabelsQuery();

    const [selectedOptions, setSelectedOptions] = useState<SelectOptionType[]>([]);

    const [createNote, {}] = noteAPI.useCreateNoteMutation();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<INoteCreateData>({
        mode: 'onChange',
    });

    const onSubmit = async (values: INoteCreateData) => {
        console.log('values', values);
        const res = await createNote({
            ...values,
            coordinates: coordinates,
            labels: selectedOptions.map((item) => item.value),
        });
        console.log('res', res);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card
            variant="outlined"
            className={styles.NoteForm}
            sx={{ padding: '15px' }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    id="name"
                    label="Название"
                    {...register('name', {
                        required: 'Придумайте название',
                    })}
                    type="text"
                    size="small"
                    sx={{ width: '100%', marginBottom: 1 }}
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                />

                <Controller
                    name="labels"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <MultipleSelectUI
                            {...field}
                            label="Лэйблы"
                            options={labels?.data?.map((item) => ({ label: item.name, value: item.id }))}
                            renderOption={(option) => {
                                return <div>{option.label}</div>;
                            }}
                            size="small"
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                        />
                    )}
                />

                <TextField
                    id="text"
                    label="Текст"
                    sx={{ marginBottom: 1, marginTop: 1, width: '100%' }}
                    {...register('text', {
                        required: 'Напишите текст',
                    })}
                    multiline
                    rows={6}
                    size="small"
                    type="text"
                    error={Boolean(errors.text?.message)}
                    helperText={errors.text?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%' }}
                >
                    Сохранить
                </Button>
            </Box>
        </Card>
    );
};

export default NoteForm;
