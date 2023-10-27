Dans AuthentificationController

On pourrait uniformiser dans des fonctions les fonctionnalités suivantes pour dry le code:
- Génération de token
- Vérification du token (is string? is right length?)
- Génération de date d'expiration et/ou fonction qui renvoie une date + x jour ou + y minutes
- Validation de date (fonction qu'on passe expireDate et qui dit si c'est expiré ou pas) à voir dépendament de si on a besoin de voir si c'est expiré depuis plus de x minutes ou autres fonctionnalité du genre
- La gestion d'envoi de courriel est à revoir, en ce moment c'est du copier/collé réutilisé


sendResetPasswordLinkByEmail
//Check if x amount of time elapsed since last token sent
La vérification de si l'objet "changePassword" et sous-objet "expireDate" existe pourrait être plus béton
(e.g. typeof changePassword.expireDate == 'date')
