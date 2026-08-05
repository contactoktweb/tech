import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env.local') });


// Configurar cliente de Sanity
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yvo5n0b0';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("No token found!");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2023-01-01',
});

async function uploadImage(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
  });
  return asset;
}

async function run() {
  console.log("Iniciando carga de imágenes...");
  const personasDir = path.join(__dirname, '../public/personas');
  const files = fs.readdirSync(personasDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
  
  const teamArray = [];
  let index = 1;
  
  for (const file of files) {
    const filePath = path.join(personasDir, file);
    console.log(`Subiendo ${file}...`);
    try {
      const asset = await uploadImage(filePath);
      teamArray.push({
        _key: Math.random().toString(36).substring(2, 12),
        _type: 'person', // from the schema object type name if defined, but objects in arrays can just have _key
        name: `Miembro del Equipo ${index}`,
        role: 'Parte del equipo Fangan Tech',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      });
      index++;
    } catch (err) {
      console.error(`Error subiendo ${file}:`, err);
    }
  }

  console.log("Imágenes subidas. Buscando el documento aboutPage...");
  
  const query = `*[_type == "aboutPage"][0]`;
  const existingDoc = await client.fetch(query);
  
  if (existingDoc) {
    console.log(`Documento encontrado con ID: ${existingDoc._id}. Actualizando campo team...`);
    await client.patch(existingDoc._id)
      .set({ team: teamArray })
      .commit();
    console.log("Documento actualizado con éxito!");
  } else {
    console.log("Documento aboutPage no existe. Creando uno nuevo con la información requerida...");
    const newDoc = {
      _type: 'aboutPage',
      title: 'Nosotros',
      introText: 'Fangan Tech fuera mucho más que una empresa que vende computadores, impresoras y cámaras. La visión que hemos construido juntos es que la tecnología sea una herramienta para la inclusión, inspirada en la historia de Daniel, pero sin que la empresa dependa únicamente del tema del autismo.\n\nCreo que esta misión y visión pueden darle una identidad sólida y con proyección internacional.',
      mission: 'En Fangan Tech desarrollamos e implementamos soluciones tecnológicas que impulsan la transformación digital de empresas, instituciones y comunidades. Creemos que la tecnología debe ser una herramienta para generar oportunidades, promover la inclusión y mejorar la calidad de vida de las personas, actuando siempre con innovación, compromiso y responsabilidad social.',
      vision: 'Ser una empresa líder en soluciones tecnológicas en Colombia y América, reconocida por combinar innovación, excelencia e impacto social. Aspiramos a demostrar que la tecnología puede derribar barreras, fortalecer organizaciones y construir un futuro más inclusivo para todas las personas.',
      purpose: 'Transformar vidas a través de la tecnología.',
      slogans: [
        'Tecnología que transforma vidas.',
        'Innovación con propósito.',
        'Technology with Purpose.',
        'Innovación sin barreras.',
        'Construyendo un futuro más inclusivo.'
      ],
      values: [
        'Innovación',
        'Inclusión',
        'Integridad',
        'Excelencia',
        'Compromiso',
        'Responsabilidad social',
        'Trabajo en equipo',
        'Empatía'
      ],
      signaturePhrase: '“La tecnología tiene sentido cuando mejora la vida de las personas.”',
      team: teamArray
    };
    await client.create(newDoc);
    console.log("Documento creado con éxito!");
  }
}

run().catch(console.error);
