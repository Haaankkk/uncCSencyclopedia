//MARK: Functions
function isNotNull(obj) {
    return (obj !== null && typeof obj !== 'undefined');
}

function min(a, b) {
    return a > b ? b : a;
}

function max(a, b) {
    return a > b ? a : b;
}

function l(sth) {
    console.log(sth);
}

function getNormalizedScore(probability) {
    if (probability % 100 < 50) {
        probability = probability - probability % 100;
    } else {
        probability = probability + 100 - probability % 100
    }
    return probability / 50;
}


//MARK: Classes
const KMP_NAME = 'KMP';
const TESSA_NAME = 'Tessa Joseph-Nicolas'
//attribute list is map {questionID: bool}
class Professor {
    constructor(
        name,
        attributeList,
        specificQuestion = [],
    ) {
        this.name = name;
        this.attributeList = attributeList;
        this.probability = 0;
        this.specificQuestion = specificQuestion;
    }
}






//MARK: Professors
const QuestionKeys = {
    IS_THIS_PROFESSOR_A_MALE: 'IS_THIS_PROFESSOR_A_MALE',
    IS_HE_WEARING_GLASS: 'IS_HE_WEARING_GLASS',
    IS_HE_ABOVE_50: 'IS_HE_ABOVE_50',
    IS_HE_ASIAN: 'IS_HE_ASIAN',
    ARE_YOU_TAKING_NEXT_SEMESTER: 'ARE_YOU_TAKING_NEXT_SEEMSTER',
    DOES_HE_LIKE_TELLING_STORIES: 'DOES_HE_LIKE_TELLING_STORIES',
    DOES_HE_HAVE_HIS_OWN_WEBSITE: 'DOES_HE_HAVE_HIS_OWN_WEBSITE',
    DO_YOU_ENJOY_HIS_CLASS: 'DO_YOU_ENJOY_HIS_CLASS',
    DOES_HE_REUSE_PAST_EXAMS: 'DOES_HE_REUSE_PAST_EXAMS',
    DOES_HE_PLAY_MUSIC_BEFORE_LECTURES: 'DOES_HE_PLAY_MUSIC_BEFORE_LECTURES',
    DOES_HE_ENJOY_TEACHING: 'DOES_HE_ENJOY_TEACHING',
    ARE_HIS_COURSES_DIFFCULT: 'ARE_HIS_COURSES_DIFFCULT',
    DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY: 'DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY'
}

const Questions = new Map([
    [QuestionKeys.IS_THIS_PROFESSOR_A_MALE, 'Is this professor a male?'],
    [QuestionKeys.IS_HE_ASIAN, 'Is he Asian?'],
    [QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, 'Are you taking his class next semester?'],
    [QuestionKeys.IS_HE_WEARING_GLASS, 'Is he wearing glasses?'],
    [QuestionKeys.IS_HE_ABOVE_50, 'Is he above 50?'],
    [QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, 'Does he like telling stories?'],
    [QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, 'Does he have his own website?'],
    [QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, 'Do you enjoy his class?'],
    [QuestionKeys.DOES_HE_REUSE_PAST_EXAMS, 'Does he reuse past exams?'],

    [QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, 'Does he play music before lectures?'],
    [QuestionKeys.DOES_HE_ENJOY_TEACHING, 'Does he enjoy teaching?'],
    [QuestionKeys.ARE_HIS_COURSES_DIFFCULT, 'Are his courses difficult?'],
    [QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, 'Is he active on social media?'],
]);

const ATTRIBUTE_VALUES = {
    TRUE: true,
    FALSE: false,
    HIGHLY_LIEKLY: 'HIGHLY_LIEKLY',
    MODERATELY_LIKELY: 'MODERATELY_LIKELY',
    KINDOF_LIKELY: 'KINDOF_LIKELY',
    A_LITTLE_LIKELY: 'A_LITTLE_LIKELY',
    HIGHLY_UNLIEKLY: 'HIGHLY_UNLIEKLY',
    MODERATELY_UNLIKELY: 'MODERATELY_UNLIKELY',
    KINDOF_UNLIKELY: 'KINDOF_UNLIKELY',
    A_LITTLE_UNLIKELY: 'A_LITTLE_UNLIKELY',
}



class GameManager {
    constructor() {
        this.nextQuestion = QuestionKeys.IS_THIS_PROFESSOR_A_MALE;

        const A_KMP = new Map();
        A_KMP.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_KMP.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.TRUE);
        A_KMP.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_KMP.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_KMP.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_KMP.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.FALSE);
        A_KMP.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.FALSE);
        A_KMP.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_KMP.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.TRUE);
        A_KMP.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_KMP.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_KMP = new Professor('Ketan Mayer-Patel', A_KMP, ['Is he director of undergraduate CS']);


        const A_AS = new Map();
        A_AS.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_AS.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_AS.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_AS.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.FALSE);
        A_AS.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.FALSE);
        A_AS.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.FALSE);
        A_AS.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_AS.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.HIGHLY_LIKELY);
        A_AS.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_AS.set(QuestionKeys.DOES_HE_ENJOY_TEACHING, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_AS.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.HIGHLY_UNLIKELY);
        A_AS.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_AS = new Professor('Aaron Smith', A_AS);

        const A_HF = new Map();
        A_HF.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_HF.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_HF.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.FALSE);
        A_HF.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_HF.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_HF.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.HIGHLY_LIEKLY);
        A_HF.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.FALSE);
        A_HF.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY);
        A_HF.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_HF.set(QuestionKeys.DOES_HE_ENJOY_TEACHING, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_HF.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_HF.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_HF = new Professor('Henry Fuchs', A_HF);

        const A_JS = new Map();
        A_JS.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_JS.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_JS.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_JS.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_JS.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_JS.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_JS.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.FALSE);
        A_JS.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY);
        A_JS.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_JS.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.HIGHLY_LIKELY);
        A_JS.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);
        const P_JS = new Professor('Jack Snoeyink', A_JS);

        const A_DS = new Map();
        A_DS.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_DS.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_DS.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_DS.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_DS.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.FALSE);
        A_DS.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_DS.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_DS.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_DS.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_DS.set(QuestionKeys.DOES_HE_ENJOY_TEACHING, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_DS.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_DS.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);
        const P_DS = new Professor('David Stotts', A_DS);



        const A_CJ = new Map();
        A_CJ.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_CJ.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_CJ.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_CJ.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.FALSE);
        A_CJ.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.FALSE);
        A_CJ.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_CJ.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.TRUE);
        A_CJ.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.TRUE);
        A_CJ.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.TRUE);
        A_CJ.set(QuestionKeys.DOES_HE_ENJOY_TEACHING, ATTRIBUTE_VALUES.TRUE);
        A_CJ.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY);
        A_CJ.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        const P_CJ = new Professor('Kris Jordan', A_CJ);

        const A_BM = new Map();
        A_BM.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_BM.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_BM.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_BM.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY);
        A_BM.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_BM.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_BM.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.FALSE);
        A_BM.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_BM.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_BM.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY);
        A_BM.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);

        const P_BM = new Professor('Brent Munsell', A_BM);

        const A_JM = new Map();
        A_JM.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_JM.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_JM.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_JM.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_JM.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_JM.set(QuestionKeys.DOES_HE_LIKE_TELLING_STORIES, ATTRIBUTE_VALUES.TRUE);
        A_JM.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.TRUE);
        A_JM.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_JM.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_JM.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_JM = new Professor('John Majikes', A_JM);

        const A_JT = new Map();
        A_JT.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_JT.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_JT.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_JT.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.FALSE);
        A_JT.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_JT.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.true);
        A_JT.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_JT.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_JT.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_JT.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);

        const P_JT = new Professor('Jeff Terrell', A_JT);

        const A_TJ = new Map();
        A_TJ.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.FALSE);

        const P_TJ = new Professor(TESSA_NAME, A_TJ);

        const A_MS = new Map();
        A_MS.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_MS.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.TRUE);
        A_MS.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_MS.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.HIGHLY_LIKELY);
        A_MS.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_MS.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.TRUE);
        A_MS.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.HIGHLY_LIKELY);
        A_MS.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_MS.set(QuestionKeys.DOES_HE_ENJOY_TEACHING, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_MS.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_MS.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_MS = new Professor('Montek Singh', A_MS);

        const A_MB = new Map();
        A_MB.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_MB.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.TRUE);
        A_MB.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.FALSE);
        A_MB.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.FALSE);
        A_MB.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.FALSE);
        A_MB.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.TRUE);
        A_MB.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_MB.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_MB.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.TRUE);

        const P_MB = new Professor('Mohit Bansal', A_MB);

        const A_KJ = new Map();
        A_KJ.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_KJ.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_KJ.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_KJ.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY);
        A_KJ.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.FALSE);
        A_KJ.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_KJ.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.HIGHLY_LIKELY);

        const P_KJ = new Professor('Kevin Jeffrey', A_KJ);

        const A_GS = new Map();
        A_GS.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_GS.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_GS.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_GS.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.FALSE);
        A_GS.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_GS.set(QuestionKeys.DOES_HE_REUSE_PAST_EXAMS, ATTRIBUTE_VALUES.TRUE);
        A_GS.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_GS.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_GS.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_GS.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_GS = new Professor('Jorge Silva', A_GS);

        const A_LM = new Map();
        A_LM.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_LM.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_LM.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.TRUE);
        A_LM.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_LM.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.TRUE);
        A_LM.set(QuestionKeys.DOES_HE_HAVE_HIS_OWN_WEBSITE, ATTRIBUTE_VALUES.TRUE);
        A_LM.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.KINDOF_UNLIKELY);
        A_LM.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_LM.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.MODERATELY_LIKELY);
        A_LM.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_LM = new Professor('Leonard McMillan', A_LM);

        const A_DP = new Map();
        A_DP.set(QuestionKeys.IS_THIS_PROFESSOR_A_MALE, ATTRIBUTE_VALUES.TRUE);
        A_DP.set(QuestionKeys.IS_HE_ASIAN, ATTRIBUTE_VALUES.FALSE);
        A_DP.set(QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER, ATTRIBUTE_VALUES.FALSE);
        A_DP.set(QuestionKeys.IS_HE_ABOVE_50, ATTRIBUTE_VALUES.TRUE);
        A_DP.set(QuestionKeys.IS_HE_WEARING_GLASS, ATTRIBUTE_VALUES.FALSE);
        A_DP.set(QuestionKeys.DOES_HE_REUSE_PAST_EXAMS, ATTRIBUTE_VALUES.TRUE);
        A_DP.set(QuestionKeys.DO_YOU_ENJOY_HIS_CLASS, ATTRIBUTE_VALUES.A_LITTLE_LIKELY);
        A_DP.set(QuestionKeys.DOES_HE_PLAY_MUSIC_BEFORE_LECTURES, ATTRIBUTE_VALUES.FALSE);
        A_DP.set(QuestionKeys.ARE_HIS_COURSES_DIFFCULT, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_DP.set(QuestionKeys.DOES_HE_ENJOY_TEACHING, ATTRIBUTE_VALUES.MODERATELY_UNLIKELY);
        A_DP.set(QuestionKeys.DOES_HE_USE_SOCIAL_MEDIA_FREQUENTLY, ATTRIBUTE_VALUES.FALSE);

        const P_DP = new Professor('David Plaisted', A_DP);



        const ALL_PROFESSORS = [P_AS, P_BM, P_CJ, P_DP, P_DS, P_GS, P_HF, P_JM, P_JS, P_JT, P_KJ, P_KMP, P_LM, P_MB, P_MS, P_TJ];
        this.professorsLeft = ALL_PROFESSORS;
    }
}




