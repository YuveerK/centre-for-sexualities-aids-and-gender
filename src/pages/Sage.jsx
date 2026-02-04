const members = [
  { name: 'Prof Kevin Smith (Chair)', role: 'Dean: Humanities' },
  { name: 'Prof Liesel Ebersöhn', role: 'Professor: Director: Centre for the Study of Resilience' },
  { name: 'Prof Theresa Rossouw', role: 'Associate Professor: Faculty of Health Sciences' },
  {
    name: 'Prof Charlene Carbonatto',
    role: 'Senior Lecturer: Department of Social Work and Criminology, Faculty of Humanities',
  },
  { name: 'Mr Edwin Smith', role: 'Director: Mamelodi Campus' },
  { name: 'Ms Ninette Mouton', role: 'Grants Manager, Department of Research Innovation and Support' },
  { name: 'Ms Bes Liebenberg', role: 'Department of Residence Affairs' },
  {
    name: 'Prof Melvyn Quan',
    role: 'Department of Tropical Veterinary Diseases, Faculty of Veterinary Sciences',
  },
  { name: 'Dr Stephan de Beer', role: 'Director: Centre for Contextual Ministry, Faculty of Theology' },
  { name: 'Sr Hannelie Coetzee', role: 'Head: Student Health Service' },
  { name: 'Ms Ntsikie Loteni', role: 'Director: Transformation Office' },
  { name: 'Prof Tanya van Wyk', role: 'Faculty of Theology' },
  { name: 'UP Student Representative Council: President', role: '' },
  { name: 'UP Student Representative Council: Transformation', role: '' },
  { name: 'Mr Pierre Brouard', role: 'Acting Director: CSA&G' },
  { name: 'Mr Johan Maritz', role: 'CSA&G Senior Manager: Operations & CSA&G Press' },
  { name: 'SAGE Secretariat', role: '' },
  { name: 'Ms Belinda Pakati', role: 'Senior Manager: Community Engagement – CSA&G' },
  { name: 'Ms Vuyisa Mamanzi', role: 'Researcher and Project Coordinator – CSA&G' },
  { name: 'Ms Hulisani Khorombi', role: 'Project Manager: Just Leaders – CSA&G' },
  { name: 'Dr Christi Kruger', role: 'CSA&G Senior Manager: Research' },
]

export default function Sage() {
  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Our Story</p>
        <h1 className="section-title text-4xl sm:text-5xl">The Tuks AIDS Reference Group (TARG)</h1>

        <div className="mt-8 space-y-6 text-ink-700">
          <p>
            Sexualities, AIDS and Gender Expertise @ UP (SAGE@UP) guides the work of the CSA&G and is composed of a
            number of individuals representing all areas of university operations. In consultation with the Deans,
            Faculty committees, HR and other stakeholders, reference group members are nominated based on one or more
            of the following: their interest in Sexualities, AIDS and Gender as well as their ability to represent a
            faculty/department/campus entity and their involvement in those areas and exploring broader issues of
            diversity, difference and inclusivity.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-ink-900/10 bg-white p-6">
          <h2 className="font-display text-2xl text-ink-950">Current members of SAGE are:</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink-900/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-sand-100 text-ink-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={`${member.name}-${member.role}`} className="border-t border-ink-900/10">
                    <td className="px-4 py-3 text-ink-900">{member.name}</td>
                    <td className="px-4 py-3 text-ink-700">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
