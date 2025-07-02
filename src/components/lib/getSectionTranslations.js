export async function getSectionTranslations(section, lang) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/sections/${section}?lang=${lang}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    console.error(`❌ Failed to fetch: ${res.status}`);
    console.log(res)
    throw new Error(`Failed to fetch ${section} translations`);
  }

  const data = await res.json();
  return data.content;
}
