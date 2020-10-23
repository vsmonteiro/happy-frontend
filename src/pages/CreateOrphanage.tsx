import React, { FormEvent, useState, ChangeEvent } from "react";
import { Marker } from 'react-leaflet';

import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/Sidebar";

import { LeafletMouseEvent } from 'leaflet'
import '../styles/pages/create-orphanage.css';
import { FiPlus } from "react-icons/fi";
import Map from "../components/Map";
import happyMapIcon from "../components/Map/happMapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function OrphanagesMap() {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpening_hours] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const { latitude, longitude } = position
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('opening_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)
    history.push('/app')
  }

  function handleSelectImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const selectedImages = Array.from(e.target.files)
    setImages(selectedImages)
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map onclick={handleMapClick} style={{ width: '100%', height: 280 }}>
              <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input value={name} onChange={(e) => setName(e.target.value)} id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img src={image} alt={name} key={image} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={handleSelectImage} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input value={opening_hours} onChange={(e) => setOpening_hours(e.target.value)} id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "active" : ''} onClick={() => setOpen_on_weekends(true)} >Sim</button>

                <button type="button" className={!open_on_weekends ? "active" : ''} onClick={() => setOpen_on_weekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;