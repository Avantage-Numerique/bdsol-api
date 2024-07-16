'On VSCode, press Alt + D to show preview of plantUML

@startuml "BDSOL-UML V2"
'Styles
hide circle
skinparam Linetype polyline

'Diagrams start
package Entity {

    entity "**Person**" as pers {
        _id : ObjectId
        --
        lastName : String
        firstName : String
        nickname : String
        description : String
        occupations : [ **SkillGroup** ]
        domains : [ { domain : ObjectId (Taxonomy), subMeta : **SubMeta**}, ... ]
        mainImage : ObjectId (Media)
        catchPhrase : String
        contactPoint : **ContactPoint**
        url : [ **SocialHandle** ]
        region : String
        --
        slug : String
        badges : [ String (enum BadgeTypes) ]
        meta : **Meta**
        --
        **Virtuals**
        fullName : this.firstName + ' ' + this.lastName
        name : this.firstName + ' ' + this.lastName
        type : "Person"
    }

    entity "**Organisation**" as org {
        _id : ObjectId
        --
        name : String
        description : String
        url : [ ** SocialHandle ** ]
        contactPoint : **ContactPoint**
        fondationDate : Date
        offers : [ **SkillGroup** ]
        domains : [ { domain : ObjectId (Taxonomy), subMeta : **SubMeta**}, ... ]
        team : [ **Member** ]
        mainImage : ObjectId (Media)
        catchphrase : String
        location : [ ObjectId (Place) ]
        equipment : [ **EquipmentLink** ]
        region : String
        --
        slug : String
        badges : [ String (enum BadgeTypes) ]
        meta : **Meta**
        --
        **Virtuals**
        type : "Organisation"
    }

    entity "**Taxonomy**" as taxo {
        _id : ObjectId
        --
        category : String (enum TaxonomiesCategoriesEnum)
        name : String
        description : String
        domains : [ { domain : ObjectId (Taxonomy), subMeta : **SubMeta**}, ... ]
        --
        slug : String
        meta : **Meta**
        --
        **Virtuals**
        type : "Taxonomy"
    }

    entity "**Project**" as proj {
        _id : ObjectId
        --
        name : String
        alternateName : String
        entityInCharge : ObjectId (Organisation)
        producer : ObjectId (Organisation)
        description : String
        url : [ **SocialHandle** ]
        contactPoint : **ContactPoint**
        location : [ ObjectId (Place) ]
        team : [ **Member** ]
        mainImage : ObjectId (Media)
        sponsor : [ **Sponsor** ]
        scheduleBudget : **ScheduleBudget**
        skills : [ ObjectId (Taxonomy) ]
        domains : [ { domain : ObjectId (Taxonomy), subMeta : **SubMeta**}, ... ]
        context : String (enum ProjectContextEnum)
        equipment : [ ObjectId (Equipement) ]
        --
        slug : String
        meta : **Meta**
        --
        **Virtuals**
        type : "Project"
    }

    entity "**Event**" as event {
        _id : ObjectId
        --
        name : String
        alternateName : String
        url : [ **SocialHandle** ]
        description : String
        entityInCharge : ObjectId (Organisation)
        organizer : ObjectId (Organisation)
        eventType : [ ObjectId (Taxonomy) ]
        eventFormat : String (enum EventFormatEnum)
        team : [ **Member** ]
        startDate : Date
        endDate : Date
        contactPoint : **ContactPoint**
        mainImage : ObjectId (Media)
        attendees : [ ObjectId (Person) ]
        skills : [ ObjectId (Taxonomy) ]
        domains : [ { domain : ObjectId (Taxonomy), subMeta : **SubMeta**}, ... ]
        schedule : [ **Schedule** ]
        subEvent : [ ObjectId (Event) ]
        location : [ ObjectId (Place) ]
        photoGallery : ObjectId (Media)
        --
        slug : String
        meta : **Meta**
        --
        **Virtuals**
        type : "Event"
    }

    entity "**Equipment**" as equip {
        _id : ObjectId
        --
        equipmentType : ObjectId (Taxonomy)
        label: String
        description : String
        brand : String
        modelName : String
        mainImage : ObjectId (Media)
        url : [ **SocialHandle** ]
        --
        slug : String
        meta : **Meta**
        --
        **Virtuals**
        type : "Equipment"
        name : this.brand + ' ' + this.modelName + ' ' + this.label
    }

    entity "**Media**" as media {
        _id : ObjectId
        --
        title : String
        alt : String
        description : String
        licence : String (enum LicenceList)
        --
        path : String
        url : String
        fileType : String (enum FileTypeList)
        fileName : String
        extension : String (enum FileExtensionImage)
        mediaField : String ("mainImage", "photoGallery")
        slug : String
        entityId : ObjectId (entityType)
        uploadedBy : ObjectId
        dbStatus : String ("in use", "archived", "to delete", "pending")
        meta : **Meta**
        --
        **Virtuals**
        type : "Media"
    }

    entity "**Place**" as place {
        _id : ObjectId
        --
        name : String
        description : String
        mainImage : ObjectId (Media)
        address : String
        city : String
        region : String
        mrc : String
        province : String
        postalCode : String
        country : String
        latitude : String
        longitude : String
        --
        slug : String
        meta : **Meta**
        --
        **Virtuals**
        type : "Place"
    }

    'User entity would be here
    'but let's not disclose the schema

}

'Entity Relations
'To do, but in fact, it's less comprehensible with links
'Better off just leaving the reader connect the dots with the '(ref)'
'that have been left in the entities after each 'ObjectId' --> ObjectId (type)

package SubSchema {

    entity "**Meta**" as meta {
        state : String (enum MetaStates)
        requestedBy : ObjectId (User)
        lastModifiedBy : ObjectId (User)
        message : String
        statistic : Number
    }

    entity "**SubMeta**" as subMeta {
        order : Number
    }

    entity "**SkillGroup**" as skillGroup {
        groupName : String
        skills : [ ObjectId (Taxonomy) ]
        subMeta : **SubMeta**
    }

    entity "**ContactPoint**" as contactPoint {
        email : { address : String }
        tel : { num : String, ext : String }
        website : { url : String }
    }

    entity "**EquipmentLink**" as equipmentLink {
        equipment : ObjectId (Equipment)
        qty : Number
        subMeta : **SubMeta**
    }

    entity "**Timeframe**" as timeframe {
        step : String
        eta : String (enum TimeframeEtaEnum)
        budgetRange : String (enum BudgetRangeEnum)
        subMeta : **SubMeta**
    }

    entity "**ScheduleBudget**" as scheduleBudget {
        startDate : Date
        endDateEstimate : Date
        completionDate : Date
        estimatedTotalBudget : Number
        eta : String
        timeframe : [ **Timeframe** ]
        subMeta : **SubMeta**
    }

    entity "**Schedule**" as schedule {
        name : String
        startDate : Date
        startTime : String
        endDate : Date
        endTime : String
        subMeta : **SubMeta**
    }

    entity "**SocialHandle**" as socialHandle {
        label : String
        url : String
        subMeta : **SubMeta**
    }

    entity "**Sponsor**" as sponsor {
        name : String
        entityType : String ("Person", "Organisation")
        entity : ObjectId (this.entityType)
        subMeta : **SubMeta**
    }

    entity "**Member**" as member {
        member : ObjectId (Person)
        role : String
        subMeta : **SubMeta**
    }
}

package Enums {
    enum **BadgeTypes** {
        "CB" : { fullName : "Croissant Boréal", ... }
    }

    enum **TaxonomiesCategoriesEnum** {
        Domains = "domains"
        Abilities = "abilities"
        Skills = "skills"
        Technology = "technologies"
        EventType = "eventType"
        Equipments = "equipmentType"
    }

    enum **ProjectContextEnum** {
        "Académique" = "academic"
        "Loisir" = "hobby"
        "Professionnel" = "professional"
    }

    enum **EventFormatEnum** {
        " " = " "
        "Présentiel" = "presential"
        "Asynchrone" = "asynchronous"
        "Mixte" = "mixed"
        "En ligne" = "online"
    }

    enum **LicenceList** {
        "copyright" : { licenceObject}
        "zero" : { licenceObject}
        "by-nc-nd" : { licenceObject}
        "by-nc-sa" : { licenceObject}
        "by-nc" : { licenceObject}
        "by-nd" : { licenceObject}
        "by-sa" : { licenceObject}
        "by" : { licenceObject}
    }
    enum **FileTypeList** {
        "image"
        "video"
        "sound"
    }
    enum **FileExtensionImage** {
        "png"
        "jpg"
        "jpeg"
        "gif"
        "webp"
    }

    enum **FileExtensionVideo** {
        "mp4"
    }

    enum **FileExtensionSound** {
        "wav"
        "mp3"
    }

    enum **EntityTypesEnum** {
        "person" = "Person"
        "organisation" = "Organisation"
        "project" = "Project"
        "taxonomy" = "Taxonomy"
        "event" = "Event"
        "media" = "Media"
        "place" = "Place"
        "equipment" = "Equipment"
    }
}

package Logs {
  entity "**UserHistory**" as userHistory {
    *_id : ObjectId
    --
    *user : ObjectId (User)
    *ipAddress : String
    *modifDate : Date
    *action : String ("create", "update", "delete")
    *entityCollection : String
    *modifiedEntity : ObjectId
    *fields : Object
  }
}

@enduml