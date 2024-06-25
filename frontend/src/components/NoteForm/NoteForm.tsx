import { FC, useRef, useState } from 'react';
import styles from './NoteForm.module.scss';
import { useAppSelector } from '#hooks/redux';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { INoteCreateData } from '#interfaces/INote';
import MultipleSelectUI from '#components/UI/MultipleSelectUI/MultipleSelectUI';
import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { labelAPI } from '#services/LabelService';
import { noteAPI } from '#services/NoteService';
import NoteHeader from '../NoteHeader/NoteHeader';
import SelectUI from '#components/UI/SelectUI/SelectUI';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IDType } from '#interfaces/types';
import { MAX_IMAGES } from '#utils/consts';

const NoteForm: FC = () => {
    const { coordinates } = useAppSelector((state) => state.note);
    const [images, setImages] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const inputFileRef = useRef(null);

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
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        images.forEach((file) => formData.append('images', file));
        formData.append('publicityStatusId', selectedStatus.toString());
        formData.append(
            'place',
            JSON.stringify({
                name: values.place.name,
                lat: coordinates.lat,
                lng: coordinates.lng,
            })
        );
        formData.append('labels', JSON.stringify(selectedOptions.map((item) => item.value)));

        await createNote(formData)
            .unwrap()
            .then((payload) => {
                console.log('fulfilled', payload);
                reset();
                setSelectedOptions([]);
                setSelectedStatus(statuses ? statuses[0].id : 1);
                setImages([]);
            })
            .catch((error) => {
                console.error('rejected', error);
                setErrorMessage('Не удалось создать заметку :(');
            });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.files;

        if (value) {
            if (value.length + images.length > MAX_IMAGES) {
                alert(`Вы можете загрузить максимум ${MAX_IMAGES} изображений.`);
                return;
            }

            const files = Array.from(value);
            setImages((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

                <div className={styles.Row}>
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

                    <Button
                        type="button"
                        variant="outlined"
                        disabled={images.length >= MAX_IMAGES}
                        onClick={() => (inputFileRef.current as any).click()}
                    >
                        Добавить изображения
                    </Button>
                </div>

                <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={inputFileRef}
                            multiple
                            onChange={(e) => {
                                handleImageChange(e);
                                field.onChange(e.target.files);
                            }}
                        />
                    )}
                />

                <div className={styles.ImageContainer}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={styles.Image}
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`img-${index}`}
                                height="80"
                            />
                            <IconButton
                                className={styles.RemoveButton}
                                aria-label="upload"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <CloseRoundedIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            </IconButton>
                        </div>
                    ))}
                </div>

                <div className={styles.ErrorMessage}>{errorMessage}</div>

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
