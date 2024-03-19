import { initializeApp, getApps, cert } from 'firebase-admin/app';


const obj={
    "type": "service_account",
    "project_id": "book-vampire",
    "private_key_id": "2a6960d6da23c621d96ff5a0efb0a818a1719f69",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDphJfJC4xOr7Nk\n6X9d/rd97ISF9k0dgguIQntJ6+e4hQtjmYWfBjacRfgU6KTAEPF/Mx255nY5mQBE\n2xcffCQto3wKnbNBjMfowgwo7hRWwexSffBtDhbv25I9IH46gVptHtC6lC2v/qiO\nAPjZJOeX8oZNBuIFxWXylTEwQuaSbh0at0ISatt0LCYmI4AY/TxN8xDWEoHR/1mS\nrJqtUedgsikLSuSk1opkC7uXFQvR/18io9rb+ohAUAFlP4CEeu+aErROp1Ro+BCt\nzgP8gMy/gH5NesIKn3OnZY/E9m3efAaJG1sbr8IaPUBDNnG5EcF38J9IEmxYrjNc\nrBTKvZGPAgMBAAECggEADM7HbnDyNJyhZ78Ay9x9Hux6hkhwiVZJIKOY1ICaWH3/\nlmpksEisdRzHUwpBgwFK5ZGdp0UTJeyU3bHwjjsGVvR5CLIGk2lPy53dAd+xAOMo\n/YtHxQt5SZWO60hddAMFPSfsBde7u8PpZcR64ZoLE8PrBs2CVxOxGEGDjaSVteE2\nZy+oA8b+375INi+75aPToXEB6pvUpIo/Ym0zux7bHS+r/TgNWlg5CxUEyVZn3Zwd\nGy6p+v/72Axj/KOXYjalcxnhZzn8GnLdr+FaiJp3v/qR0QbYFkTcadUl5uF7JcMi\nB+gYXbOcJ05d/vHlPylwyVuj4AX5ITpFgUiW6BYl1QKBgQD5E0z9wZVTm1JQS6vp\nQzlI7ZhWcj6LBa5HAkAXUQ9lSrnJyHCechg0R6z/WHaW6um0BiBbIEzKqV2RYwnA\npeo0vg7qFYfooVTys8G+kGeNtsJFug6FZDCx58QN53lK1q7/7k+SjGlGm64G4axL\n6A/jHh0Nay4kXmpkoj3ZonolhQKBgQDwApFjTRglZ3UrUczMQknlZe9yBbF5x9+N\np8chFuvH/DQvMgqy2f+CtViVi/xYfB0hkIwa38ENY6boAxg6Kvtw/JwqJhRSpNky\n7vhoLj54FcoFwOu/gjiUwmdyRBbmDIRcUKWpTwBFFpzOPni4hn9383P53i86rke+\nYR00czftAwKBgAkOgZssgdCDck/HIJ4fuqKDOSnTh6CoeTjNxSTT5rppKC5FIosw\nXN7xyEGUpuM/8XWBT4Xgu8oWtHdH4Z/mqIh4bLRoSgPUcfFNRfs25v0JKzE73bFN\n/lNJuSBETW3CNqTJtoz+nAlcOcy4QfqUmpdIjgfh4NCjujykhZk3Rje9AoGBAK3I\nXjc1kj87GwbD0vMvKEx2s5qu7qOMCp2KF1ApRY3nWm214TNBT5X38u1Nj+kN7RXp\nkNjAnQsx1Z925irwBmH4Nqb6LYrtm+saRzlACrFurXnfB5QCGS/1V2vQS3hFJe2l\n412lOz/LMLzRVR3fHRrgZ2BL9Yyato3tyXS53Iu7AoGARKHMLIGs1tilWm3AYuZ3\n05Y8GI2UhJA+qlREU6UiYb2/zp+06FivBUwPbZc4kaxG7OKkniYRbDhTx49SpnGL\n4xB6TNmLLHFE82esw8TsLYS35/s6TjfeLIOGO+m/UkyTSdEsybG58gWqpin07gQ0\njtrSo4R0ZfPOXr2N0VlZ5XY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fj7w4@test-90540.iam.gserviceaccount.com",
    "client_id": "115958793930209078585",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fj7w4%40test-90540.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  

const firebaseAdminConfig = {
    
    credential: cert({
        projectId: "bookingsystem-asuuk0802",
        clientEmail:"firebase-adminsdk-6cxt8@bookingsystem-asuuk0802.iam.gserviceaccount.com",
        privateKey:  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfh9h7EM3flPE6\nekamBuNPtfvI55dQUoebNa0d4uSTio474iOooS0bxFIo1YlkKg/ajiDhbLZlSS7s\nhWp8Wc07Kag+Q+XCwJOdXEQS6nUyN5ZETKyZT6GFB9YL4avN++86D0ORpVdWn8QO\nsW7JSfBIfggPnKqmx9HUuUr0Sar+iSKTdZhOx3ieYBlULFqRazsID8urZeuJgLor\n8A0z1hTQiZUQSss9z0zsJOTsboMzBRymFB+mvMPiHSIDr/ceqXkLzGvkHL6UCgQ/\n7//+2zv+dEY9mZaU1PnRqIOx8V7lFqdQ8JL8T8nwNv7wbKcP5R9mlrd8pt1Us8Ce\nrcdHRNnhAgMBAAECggEABb97RlzeAmYU1u1ehDXwofPay+WCq1bX9FqKv1Y+jPm2\n4xzTUGqGm6xudWzaSdhYDIVznIBcZ1ncqkna/WQcxizxzdoWni2wDg+Zk4fyaA5s\nX4i+NnoI/AAB1c/hiFw2YF6UnPnst0ZH9x3CbMwpMOAGyon7jGrefzMdlY8QZdeq\nHXWr9HFIMTFoLPVyA+cXe9BZqntwR9ek787Cblb/+v9auQsfbsZAeLQVRgaQhgno\neUMzflgMi77bdi3A5M2kXnjC/HbfNC5vW55BhZFUzaYXJJX3VJ+q3yfIE1A17aZu\nQG4ETpaS2PThrqPruXcJQtkqVfPzldQzFPcJG6qiXQKBgQDyIN8AJI0rXdgr98hp\n90nw90Y2RI2tphkF/1rwkqXwc83cbngyh/T15PicB81zd+hRXBDbrL+cpaO6thQk\nwpWm1aATEwMnhxh6GvHv1zBt07qJHrxZ63LTXHBwub/v7Ua93sjdX1HmnIezTfQ4\nimLtCpF1j0l4Cd4bjCMxi4/PzQKBgQDsVjbUmzXDGN5OTCfw2l7ArkN0FXHuUpyj\ngn5dl6qbE84urcVO8AFEPIWSNZTwf50TuPQmYsw33PpXKFvlalAtfW91Oha3XEse\n0I2hmA/rJWMR5Ty5BXBaqiKVEBMq2/VymblQRpz7SResBA33St8D2xA0bXRAc0/x\nYVzjU51WZQKBgHVP+dvu2bseP+OlrSOyXc/zbsBSXLa62DrwqxYOZ3nmEeLwXypU\ndxpAczfeC+wbN6Nb0QsuWrRCCN8o4v+gi7OGo4U6W/fl27Ulov0KrPs5b5KKIsYK\nbtr7Wbs0NEvCEdlivL2NNnhedN0qMt7GJgIlca6c2wLe/Q8pyc9yiB4tAoGBAMxm\nkEt25ZuT4YjkUtL7emG5FfvLJFtTtcew7+uwZcxz56n1fqWT6/SBR6C5mNQb+tV4\n7Cha4HccNqO08y3Ksgd16jUABW+Wch33j9cHthTQpAtxMQBwlMjFRt2XJoy16mWw\nUFb+i3zFraSHaTDM327tQumlFJs9YBHK/FRcF8MFAoGANNNHA5PPVID91vX97rje\n4YGojtjPMOnMxJUfKTSOhCffUSeStFwGQJhKxTbhA0r0hk8D8Sxre72UU6t0f+/C\nBcQFbTfgx6QPuhBr7Txx6zgvvyfN8yPzBaGU1N1BagOxiHqa9HftiTg5kMTuJvj3\nXAPfpwrfc7nbf3FytdU5U/Y=\n-----END PRIVATE KEY-----\n"
      })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
