import { FC, useState } from 'react';
import styles from './NoteForm.module.scss';
import { useAppSelector } from '#hooks/redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { INoteCreateData } from '#interfaces/INote';
import MultipleSelectUI from '#components/UI/MultipleSelectUI/MultipleSelectUI';
import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { labelAPI } from '#services/LabelService';
import { noteAPI } from '#services/NoteService';
import NoteHeader from '../NoteHeader/NoteHeader';
import SelectUI from '#components/UI/SelectUI/SelectUI';
import { IDType } from '#interfaces/types';

const NoteForm: FC = () => {
    const { coordinates } = useAppSelector((state) => state.note);

    const { data: labels, error, isLoading } = labelAPI.useFetchLabelsQuery();
    const {
        data: statuses,
        error: errorStatuses,
        isLoading: isLoadingStatuses,
    } = noteAPI.useFetchPublicityStatusesQuery();

    const [selectedOptions, setSelectedOptions] = useState<SelectOptionType[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<IDType>(statuses ? statuses[0].id : 1);

    const [createNote, {}] = noteAPI.useCreateNoteMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<INoteCreateData>({
        mode: 'onChange',
    });

    const onSubmit = async (values: INoteCreateData) => {
        const res = await createNote({
            ...values,
            place: {
                name: values.place.name,
                lat: coordinates.lat,
                lng: coordinates.lng,
            },
            labels: selectedOptions.map((item) => item.value),
        });
        console.log('res', res);
        reset();
    };

    if (isLoading || isLoadingStatuses) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NoteHeader mode="create" />
            <Box
                sx={{ padding: '0 15px 15px' }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    variant="h6"
                    sx={{ marginBottom: 1 }}
                >
                    Создать новую заметку
                </Typography>

                <TextField
                    id="placeName"
                    label="Название места"
                    {...register('place.name', {
                        required: 'Придумайте название места',
                    })}
                    type="text"
                    size="small"
                    sx={{ width: '100%', marginBottom: 1 }}
                    error={Boolean(errors.place?.message)}
                    helperText={errors.place?.message}
                />

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

                <div style={{ width: '45%', marginBottom: '8px' }}>
                    <Controller
                        name="publicityStatusId"
                        control={control}
                        render={({ field }) => (
                            <SelectUI
                                {...field}
                                label="Доступно"
                                options={statuses?.map((item) => ({ label: item.statusName, value: item.id }))}
                                renderOption={(option) => {
                                    return <div>{option.label}</div>;
                                }}
                                size="small"
                                selectedOption={selectedStatus}
                                setSelectedOption={setSelectedStatus}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption);
                                }}
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%' }}
                >
                    Сохранить
                </Button>
            </Box>
        </>
    );
};

export default NoteForm;
