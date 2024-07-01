import { FC, useEffect, useRef, useState } from 'react';
import styles from './NoteForm.module.scss';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { INoteCreateData } from '#interfaces/INote';
import MultipleSelectUI from '#components/UI/MultipleSelectUI/MultipleSelectUI';
import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { noteAPI } from '#services/NoteService';
import NoteHeader from '../NoteHeader/NoteHeader';
import SelectUI from '#components/UI/SelectUI/SelectUI';
import { IDType } from '#interfaces/types';
import { MAX_IMAGES } from '#utils/consts';
import NoteImages from '#components/NoteImages/NoteImages';
import { resetPlace } from '#store/reducers/noteSlice';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { INoteFormProps } from './INoteFormProps';
import withLoading from '#components/HOC/withLoading';
import { IImage } from '#interfaces/IImage';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { useNavigate } from 'react-router-dom';
import { MAP_PAGE } from '#utils/urls';

const NoteFormInside: FC<INoteFormProps> = ({ isEdit, note, labels, statuses }) => {
    const { place } = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const inputFileRef = useRef(null);

    const [images, setImages] = useState<IImage[]>(note?.images || []);
    const [newImages, setNewImages] = useState<File[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<SelectOptionType[]>(
        note?.labels.map((label) => ({ label: label.name, value: label.id })) || []
    );
    const [selectedStatus, setSelectedStatus] = useState<IDType>(
        note?.publicityStatus?.id || (statuses ? statuses[0].id : 1)
    );

    const [createNote, {}] = noteAPI.useCreateNoteMutation();
    const [updateNote, {}] = noteAPI.useUpdateNoteMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<INoteCreateData>({
        mode: 'onChange',
    });

    useEffect(() => {
        if (note) {
            reset({
                name: note.name,
                text: note.text,
                place: note.place,
            });
        }
    }, [note, reset]);

    const onSubmit = async (values: INoteCreateData) => {
        const formData = new FormData();

        if (values.name !== note?.name) {
            formData.append('name', values?.name);
        }
        if (values.text !== note?.text) {
            formData.append('text', values?.text);
        }
        if (selectedStatus !== note?.publicityStatus?.id) {
            formData.append('publicityStatusId', selectedStatus.toString());
        }

        console.log('place', place);
        if (!note) {
            // если создание, сохранить точку
            formData.append(
                'place',
                JSON.stringify({
                    name: values.place.name,
                    latitude: place?.latitude,
                    longitude: place?.longitude,
                })
            );
        } else if (note && values.place.name !== note.place.name) {
            // если редактирование, то сохранить только название места, если было изменено
            formData.append(
                'place',
                JSON.stringify({
                    name: values.place.name,
                })
            );
        }
        if (values.labels !== note?.labels.map((l) => l.id)) {
            formData.append('labels', JSON.stringify(selectedOptions.map((item) => item.value)));
        }

        newImages.forEach((file) => formData.append('images', file));
        if (isEdit) {
            formData.append('oldImages', JSON.stringify(images.map((item) => item.id.toString())));
        }

        console.log('formData', note?.id, formData);

        if (!isEdit) {
            await createNote(formData)
                .unwrap()
                .then((payload) => {
                    console.log('fulfilled', payload);
                    navigate(MAP_PAGE);
                })
                .catch((error) => {
                    console.error('rejected', error);
                    setErrorMessage('Не удалось создать заметку :(');
                });
        } else if (note) {
            await updateNote({ id: note?.id, data: formData })
                .unwrap()
                .then((payload) => {
                    console.log('fulfilled', payload);
                    navigate(MAP_PAGE);
                })
                .catch((error) => {
                    console.error('rejected', error);
                    setErrorMessage('Не удалось обновить заметку :(');
                });
        }
    };

    useEffect(() => {
        return () => {
            dispatch(resetPlace());
        };
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.files;

        if (value) {
            if (value.length + images.length > MAX_IMAGES) {
                alert(`Вы можете загрузить максимум ${MAX_IMAGES} изображений.`);
                return;
            }

            const files = Array.from(value);
            setNewImages((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleRemoveImage = (imageId: IDType) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
    };

    const handleRemoveNewImage = (index: number) => {
        setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

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
                    {isEdit ? 'Изменить заметку' : 'Создать новую заметку'}
                </Typography>

                <div className={styles.PlaceField}>
                    <PlaceRoundedIcon fontSize="large" />
                    <TextField
                        id="placeName"
                        label="Название места"
                        {...register('place.name', {
                            required: 'Придумайте название места',
                        })}
                        defaultValue={place?.name}
                        type="text"
                        size="small"
                        sx={{ width: '100%', marginBottom: 1 }}
                        error={Boolean(errors.place?.message)}
                        helperText={errors.place?.message}
                    />
                </div>

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
                            options={labels?.map((item) => ({ label: item.name, value: item.id }))}
                            renderOption={(option) => {
                                return <div>{option.label}</div>;
                            }}
                            size="small"
                            selectedOptions={selectedOptions}
                            onChange={(selectedOptions) => {
                                setSelectedOptions(selectedOptions);
                                field.onChange(selectedOptions);
                            }}
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
                                onChange={(selectedOption) => {
                                    setSelectedStatus(selectedOption);
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

                <NoteImages
                    images={images}
                    isFiles={false}
                    imageHeight={80}
                    withDelete={true}
                    handleRemoveImage={(id) => handleRemoveImage(id)}
                />

                <NoteImages
                    images={newImages}
                    isFiles={true}
                    imageHeight={80}
                    withDelete={true}
                    handleRemoveImage={(index) => handleRemoveNewImage(index)}
                />

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

export default withErrorHandling(withLoading(NoteFormInside));
