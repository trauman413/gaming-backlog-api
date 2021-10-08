class Game {
    name: string 
    platforms: Array<string>
    genres: Array<string>
    franchises: Array<string>
    companies: Array<string>
    releaseDate: Array<string>
    summary: string
    image: string // TODO: determine if this is accurate

    constructor(name: string, platforms =[], genres = [], franchises = [], companies = [], releaseDate = [], summary="", image=null) {
        this.name = name
        this.platforms = platforms
        this.genres = genres 
        this.franchises = franchises 
        this.companies = companies 
        this.releaseDate = releaseDate
        this.summary = summary
        this.image = image
    }


    //TODO: create setters/getters

    set setName(name: string) {
        this.name = name
    }

    set setPlatforms(platforms: string[]) {
        this.platforms = platforms
    }

    set setGenres(genres: string[]) {
        this.genres = genres
    }

    set setFranchises(franchises: string[]) {
        this.franchises = franchises
    }

    set setCompanies(companies: string[]) {
        this.companies = companies
    }

    set setReleaseDate(date: string[]) {
        this.releaseDate = date
    }

    set setSummary(summary: string) {
        this.summary = summary
    }

    set setImage(img: string) {
        this.image = img
    }

}

export { Game }