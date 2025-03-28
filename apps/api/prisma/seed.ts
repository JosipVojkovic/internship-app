import { TestStatus } from '@internship-app/types';
import {
  Discipline,
  DisciplineStatus,
  InterviewQuestionCategory,
  InterviewQuestionStatus,
  InterviewQuestionType,
  InterviewStatus,
  PrismaClient,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.intern.createMany({
    data: [
      {
        email: 'ante.roca@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('1998-10-01T00:00:00.000Z'),
        },
        id: 'ante-roca',
      },
      {
        email: 'ante.roca2@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        interviewStatus: InterviewStatus.Done,
        data: {},
        id: 'ante-roca2',
      },
      {
        email: 'ana.kovac@example.com',
        firstName: 'Ana',
        lastName: 'Kovač',
        interviewStatus: InterviewStatus.Pending,
        data: {
          dateOfBirth: new Date('2003-03-01T00:00:00.000Z'),
        },
        id: 'ana-kovac',
      },
      {
        email: 'ivan.petrovic@example.com',
        firstName: 'Ivan',
        lastName: 'Petrović',
        interviewStatus: InterviewStatus.NoRight,
        data: {
          dateOfBirth: new Date('1999-01-01T00:00:00.000Z'),
        },
        id: 'ivan-petrovic',
      },
      {
        email: 'marija.juric@example.com',
        firstName: 'Marija',
        lastName: 'Jurić',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
        },
        id: 'marija-juric',
      },
      {
        email: 'marko.horvat@example.com',
        firstName: 'Marko',
        lastName: 'Horvat',
        interviewStatus: InterviewStatus.Missed,
        data: {
          dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
        },
        id: 'marko-horvat',
      },
      {
        email: 'petra.milic@example.com',
        firstName: 'Petra',
        lastName: 'Milić',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2007-10-01T00:00:00.000Z'),
        },
        id: 'petra-milic',
      },
      {
        email: 'josip.knez@example.com',
        firstName: 'Josip',
        lastName: 'Knez',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2002-10-01T00:00:00.000Z'),
        },
        id: 'josip-knez',
      },
      {
        email: 'katarina.vidic@example.com',
        firstName: 'Katarina',
        lastName: 'Vidić',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2003-10-01T00:00:00.000Z'),
        },
        id: 'katarina-vidic',
      },
      {
        email: 'tomislav.kos@example.com',
        firstName: 'Tomislav',
        lastName: 'Koš',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('1995-10-01T00:00:00.000Z'),
        },
        id: 'tomislav-kos',
      },
      {
        email: 'mia.babic@example.com',
        firstName: 'Mia',
        lastName: 'Babić',
        interviewStatus: InterviewStatus.Pending,
        data: {
          dateOfBirth: new Date('2000-10-01T00:00:00.000Z'),
        },
        id: 'mia-babic',
      },
    ],
  });

  await prisma.internDiscipline.createMany({
    data: [
      {
        internId: 'ante-roca',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        testScore: 51,
        priority: 1,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Approved,
        priority: 2,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Design,
        status: DisciplineStatus.Rejected,
        testStatus: TestStatus.Missed,
        priority: 3,
      },
      {
        internId: 'ana-kovac',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Design,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Missed,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 2,
      },
      {
        internId: 'marija-juric',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Rejected,
        priority: 1,
      },
      {
        internId: 'marko-horvat',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'petra-milic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Pending,
        priority: 1,
      },
      {
        internId: 'josip-knez',
        discipline: Discipline.Design,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
      {
        internId: 'katarina-vidic',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'tomislav-kos',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'mia-babic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
    ],
  });

  await prisma.interviewer.createMany({
    data: [
      {
        id: 'frane',
        name: 'Frane',
        email: 'frane@dump.hr',
        disciplines: [Discipline.Development],
      },
      {
        id: 'duje',
        name: 'Duje',
        email: 'duje@dump.hr',
        disciplines: [Discipline.Development, Discipline.Multimedia],
      },
      {
        id: 'ante',
        name: 'Ante',
        email: 'ante@dump.hr',
        disciplines: [
          Discipline.Multimedia,
          Discipline.Development,
          Discipline.Marketing,
          Discipline.Design,
        ],
      },
      {
        id: 'lovre',
        name: 'Lovre Tomić',
        email: 'lovre@dump.hr',
        disciplines: [Discipline.Development],
      },
    ],
  });

  await prisma.interviewSlot.create({
    data: {
      id: '1',
      start: new Date('2023-10-01T10:00:00.000Z'),
      end: new Date('2023-10-01T10:30:00.000Z'),
      answers: {},
      interviewers: {
        createMany: {
          data: [{ interviewerId: 'frane' }, { interviewerId: 'duje' }],
        },
      },
    },
  });

  await prisma.interviewSlot.create({
    data: {
      id: '2',
      start: new Date('2023-10-01T10:30:00.000Z'),
      end: new Date('2023-10-01T11:00:00.000Z'),
      answers: {},
      interviewers: {
        createMany: {
          data: [{ interviewerId: 'frane' }],
        },
      },
    },
  });

  await prisma.admin.createMany({
    data: [
      {
        email: 'admin@dump.hr',
        password: await bcrypt.hash('dump.1950', 10),
      },
    ],
  });

  await prisma.interviewQuestion.createMany({
    data: [
      {
        id: 'g1',
        title: 'Mjesto stanovanja (ljeto/zima)',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'g2',
        title: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'g3',
        title: 'Što znaš o DUMP-u??',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'g4',
        title: 'Očekivanja od Internshipa',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'g5',
        title: 'Imaš li laptop na kojem možeš raditi?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'g6',
        title: 'Aktivnosti u slobodno vrijeme',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'g7',
        title:
          'Koliko si vremena spreman za izdvojiti za DUMP aktivnosti po području? (izvuć točnu brojku i vidit jel realna)',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.General,
        status: InterviewQuestionStatus.Enabled,
      },

      // Personal
      {
        id: 'p1',
        title:
          'Koliki će ti internship biti prioritet u odnosu na ostale obaveze?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'p2',
        title:
          'Misliš li da ćeš kvalitetnije odrađivati zadatke u Internshipu ako te stavimo da radiš zajedno sa drugim pripravnicima ili sam?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'p3',
        title:
          'Jesi li do sada sudjelovao u nekim projektima, na natjecanjima itd.?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'p4',
        title:
          'Kako bi reagirao da se ne slažeš sa nekim u timu oko nekih ključnih odluka prilikom rada na projektu?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'p5',
        title:
          'Misliš li da trebaš poznavati nekog za zajednički rad na projektu?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'p6',
        title: 'Želis li postati član DUMP-a, ako da zašto?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'p7',
        title: 'Gdje se vidiš za 5 godina?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Personal,
        status: InterviewQuestionStatus.Enabled,
      },

      // Development
      {
        id: 'dev1',
        title: 'Zašto te zanima programiranje?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Development,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'dev2',
        title: 'Radiš li ili jesi li negdje radio/la kao developer?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Development,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'dev3',
        title:
          'Možeš li nam ispričati ukratko o projektu koji si radio/la za faks/posao/sebe?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Development,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'dev4',
        title:
          'Koje programske jezike koristiš? (koji ti je drazi, zasto, koliko iskustva ima sa tim jezikom, je li entuzijastican oko ijednog)',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Development,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'dev5',
        title: 'Imaš li neke projekte (github)?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Development,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'dev6',
        title:
          'Što je tebi najzanimljivija stvar iz svijeta programiranja koju si naučio/la u zadnje vrijeme? Ili topic koji bi htio naucit u buducnosti?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Development,
        status: InterviewQuestionStatus.Enabled,
      },

      // Design
      {
        id: 'diz1',
        title: 'Zašto te zanima dizajn?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Design,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'diz2',
        title: 'Koje te vrste dizajna zanimaju?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Design,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'diz3',
        title: 'Što misliš na kojoj si razini znanja po pitanju dizajna?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Design,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'diz4',
        title: 'Koje programe poznaješ?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Design,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'diz5',
        title: 'Imaš li neke svoje radove? Možeš li nam pokazati/poslati?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Design,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'diz6',
        title: 'Pratiš li neke dizajnere i ako da koje?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Design,
        status: InterviewQuestionStatus.Enabled,
      },

      // Marketing
      {
        id: 'mark1',
        title: 'Zašto te zanima marketing?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark2',
        title: 'Koji dio marketinga te najviše zanima?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark3',
        title:
          'Smatraš li se više kreativnom ili analitičkom osobom? Obrazloži odgovor.',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark4',
        title:
          'Imaš li iskustva u vođenju profila na društvenim mrežama? (Vidit zanima li je to i koje društvene mreže)',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark5',
        title:
          'Poznaješ li neke od oglašivačkih alata (meta ads, google ads…)?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark6',
        title:
          'Imaš li iskustva u pisanju blogova i sličnih tekstova? (PR-ovi, članci…)',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark7',
        title:
          'Postoji li nešto što nismo pokrili pitanjima u čemu imaš iskustva, a vezano je za marketing?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark8',
        title: 'Komentari na Google formu',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mark9',
        title: `1. pitanje iz Google forme`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },
      {
        id: 'mark10',
        title: `2. pitanje iz Google forme`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },
      {
        id: 'mark11',
        title: `3. pitanje iz Google forme`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },
      {
        id: 'mark12',
        title: `4. pitanje iz Google forme`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },
      {
        id: 'mark13',
        title: `5. pitanje iz Google forme`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Marketing,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },

      // Multimedia
      {
        id: 'mult1',
        title: 'Što te privuklo multimediji?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult2',
        title: 'Što inače slikaješ/snimaš?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult3',
        title:
          'Što ti je najzanimljivije između: slikavanja na eventima, montiranje videa, audio, streamanje?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult4',
        title: 'Kakvu vrstu fotografije preferiraš?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult5',
        title: 'Znaš li se koristit nekim programima?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult6',
        title: 'Imaš li fotoaparat?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult7',
        title:
          'Imas li portfolio? Jesi li sudjelovao na ikakvim projektima/edukacijama?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult8',
        title:
          'Koje fotografe/redatelje/yt kanale na temu multimedije pratiš (ako ih pratiš)?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult9',
        title: 'Kako bi opisao pripremu za slikavanje/snimanje?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },
      {
        id: 'mult10',
        title: 'Gdje se vidiš za 5 godina s obzirom na ovo područje?',
        type: InterviewQuestionType.Field,
        category: InterviewQuestionCategory.Multimedia,
        status: InterviewQuestionStatus.Enabled,
      },

      // Final
      {
        id: 'f1',
        title: `Količina slobodnog vremena koje posjeduje i spreman je ulozit prijavnik:
      1 - do 3 sata tjedno
      5 - 3 do 10 sati tjedno
      10 - preko 10 sati tjedno`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Final,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 10, step: 1 },
      },
      {
        id: 'f2',
        title: `Želja za članstvom u DUMP koju je prijavnik pokazao:
    1 - Ne zna ništa o DUMPu i ne pokazuje pretjerane ambicije za ostankom u udruzi, prijavio se više iz želje da nauči
    5 - Zna nešto o radu DUMPa van internshipa, pokazuje da bi potencijalnu želju da bude član, ali već period od godine dana mu je predalek pa nemože se najlakše procijenit di će bit u budućnosti
    10 - Zna dosta o radu DUMPa, Daysima i Ciklusima, već sada ostavlja uvjerenje da ima dovoljnu želju da bude budući član`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Final,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 10, step: 1 },
      },
      {
        id: 'f3',
        title: `Proaktivnost koju posjeduje i amicioznost koju pokazuje prijavnik:
    1 - Ne pokazuje ambicije
    5 - Jako veliki drive i ambicije, utjece na ljude oko sebe sa stvarima kojima se bavi
    `,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Final,
        status: InterviewQuestionStatus.Enabled,
        options: {
          min: 1,
          max: 5,
          step: 1,
        },
      },
      {
        id: 'f4',
        title: `Iskustvo u polju koje je prijavio:
    1 - nema ga
    2 - ima minimalno, uglavnom sa faksa/iz škole
    3 - ima nešto malo, pokušavao je nešto sam ali nije ga išlo, nije ima puno vremena i sl.
    4 - ima iskustva, radia je sam i sa kolegama/prijateljima u slobodno vrijeme i istaka je par projekata koje ima (da je link na njih)
    5 - ostavia je dojam da većinu slobodnog vremena provodi radeći (bilo sam bilo na poslu) i eksperminetirajući, da je link na radove/portfolio i dojam je da bi podiga razinu tog polja u udruzi instantno`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Final,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },
      {
        id: 'f5',
        title: `Culture fit procjena:
    1 - ne bi se uklopia lako, dojam je da bi prkosia mentalitetu i trenutnom stateu udruge
    2 - možda bi se uklopia, teško je procjenit jer nije ostavia dovoljan utisak (pretjerano je povućen)
    3 - solidan dojam, tu i tamo odudara od udruge u stavovima ali uklopia bi se uglavnom
    4 - uklopia bi se dosta dobro u ekipu, ali trebalo bi mu neko vrijeme/uklopia bi se kad bi se opustia
    5 - idealan fit za DUMP, uklopia bi se dosta brzo`,
        type: InterviewQuestionType.Slider,
        category: InterviewQuestionCategory.Final,
        status: InterviewQuestionStatus.Enabled,
        options: { min: 1, max: 5, step: 1 },
      },
      {
        id: 'f6',
        title: 'Side notes',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Final,
        status: InterviewQuestionStatus.Enabled,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
