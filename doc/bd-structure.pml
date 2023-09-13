'On VSCode, press Alt + D to show preview of plantUML

@startuml "BDSOL-UML"
hide circle
package Entity {
  entity "Person" as pers {
    *_id : ObjectId
    --
    *lastName : String
    *firstName :String
    *slug : String (firstName-lastName)
    *nickName : String
    *description : String
    *meta : Object (MetaSchema)
    --
    *occupations : 
        { occupation: ObjectId,
        subMeta : Object (SubMetaSchema) }
    --
    *mainImage : Object (MediaSchema)
    
  }

  entity "Taxonomy" as taxo {
    *_id : ObjectId
    --
    *category : String (TaxonomiesCategoriesEnum)
    *name : String
    *slug : String (name)
    *description : String
    *source : String
    *meta : Object (MetaSchema)
  }

  entity "Organisation" as org {
    *_id : ObjectId
    --
    *name : String
    *slug : String (name)
    *description : String
    *url : String
    *contactPoint : String
    *fondationDate : Date
    *meta : Object (MetaSchema)
    --
    *team : [Object (MemberSchema)]
    --
    *offers : 
        { offer : ObjectId
        subMeta : Object (SubMetaSchema)}
  }

  entity "User" as usr {
    *_id : ObjectId
    --
    *username : String
    *email : String
    *password : String
    *avatar : String
    *name : String
    *firstName : String
    *lastName : String
    *role : String
  }
}

package Logs {
  entity "UserHistory" as usrhst {
    *_id : ObjectId
    --
    *user : ObjectId
    --
    *ipAddress : String
    *modifDate : Date
    *action : String ["create", "update", "delete"]
    *entityCollection : String
    *modifiedEntity : ObjectId
    *fields : Object
  }
}

package Schemas {
  entity "meta - MetaSchema" {
    *state : ["accepted", "rejected", "deprecated", "pending"]
    *requestedBy : ObjectId
    *lastModifiedBy : ObjectId
    *message : String
  }

  entity "Media - MediaSchema" {
    *title : String
    *alt : String
    *description : String
    *path : String
    *licence : String (licenceList)
    *fileType : String (fileTypeList)
    *extension : String
    (...fileExtensionImage, ...fileExtensionVideo, ...fileExtensionSound)
    *slug : String (title)
    *entityId : ObjectId
    *entityType : String
    *uploadedBy : ObjectId
    *meta : Object (MetaSchema)
  }

  entity "Member - MemberSchema" {
    *member : ObjectId
    *role : Object (RoleSchema)
    *meta : Object (MetaSchema)
  }

  entity "Role - RoleSchema" {
    *group : String
    *title : String
  }
}

package EnumList {

  entity "TaxonomiesCategoriesEnum" {
    Occupations = "occupations"
    Domains = "domains"
    Abilities = "abilities"
    Skills = "skills"
  }

  entity "fileTypeList" {
      image
      video
      sound
  }

  entity "fileExtensionImage" {
      png
      jpg
      jpeg
      gif
      svg
      webp
  }

  entity "fileExtensionVideo" {
      mp4
  }

  entity "fileExtensionSound" {
      wav
      mp3
  }

  entity "licenceList" {
    Public Domain (CC0)
    CC By
    CC By-SA
    CC By-ND
    CC By-NC
    CC By-NC-SA
    CC By-NC-ND
    Copyright to user
  }
}

'relations
pers::occupations o-r- taxo::_id
org::offers o-r- taxo::_id
usrhst::user *-- usr::_id
usrhst::modifiedEntity *-l-> Entity
pers::_id o-- org::team

'Invisible links (format)
'pers -[hidden]d- org
'pers -[hidden]r- usr

@enduml