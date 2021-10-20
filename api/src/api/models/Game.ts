class Game {
    name: string 
    platforms: Array<string>
    genres: Array<string>
    franchises: Array<string>
    companies: Array<string>
    releaseDate: Array<string>
    summary: string
    image: string

    // constructor(name: string, platforms = [], genres = [], franchises = [], companies = [], releaseDate = [], summary=  "", image = "") {
    //     this.name = name
    //     this.platforms = platforms
    //     this.genres = genres 
    //     this.franchises = franchises 
    //     this.companies = companies 
    //     this.releaseDate = releaseDate
    //     this.summary = summary
    //     this.image = image
    // }

    constructor(name: string, platforms: string[], genres: string[], franchises: string[], companies: string[], releaseDate: string[], summary: string, image: string) {
        this.name = name
        this.platforms = platforms
        this.genres = genres 
        this.franchises = franchises 
        this.companies = companies 
        this.releaseDate = releaseDate
        this.summary = summary
        this.image = image
    }

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