import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Navigation from '../../components/Navigation'
import DiaryList from '../../components/Diary/DiaryList'
// import Calender from '../../components/Diary/Calendar'
import DiaryDetailContainer from '../../components/Diary/DiaryDetailContainer'
import '../../styles/diary/diarymain.css'
import '../../styles/diary/diarydetail.css'

function DiaryMain() {
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)

  // 전체 다이어리 목록 조회 api 연결 -> 인피니티 스크롤 필요
  const [diarys, setDiarys] = useState([])

  useEffect(() => {
    axios
      .get(`https://the-record.co.kr/api/diary/${loginUserInfo.userPk}/0`, {
        headers: {
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      })
      .then(res => {
        setDiarys(res.data)
      })
  }, [diarys])

  const openSelectDialog = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const moveMakeDiary = category => {
    navigate('/diary/makediary', { state: category })
  }

  return (
    <div id="diarymain">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="diarymain-box">
          <div className="diarymain-header">
            <p className="diarymain-header-title">전체 일기</p>
            {loginUserInfo.name === homePageHostInfo.name ? (
              <button
                type="button"
                className="make-diary-btn"
                onClick={() => {
                  openSelectDialog()
                }}
              >
                일기 작성하기
              </button>
            ) : (
              ''
            )}
          </div>
          {/* <Calender /> */}
          <div className="diarymain-content">
            {diarys.map(diary => (
              <div key={diary.diaryId} className="diarymain-item-content">
                <DiaryDetailContainer diaryInfo={diary} />
              </div>
            ))}
          </div>
        </div>
        <Navigation />
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        id="dialog"
        className="diary-dialog"
        aria-labelledby="dialog-container"
        aria-describedby="dialog-description"
        PaperProps={{
          sx: {
            minWidth: 800,
            borderRadius: 2.7,
          },
        }}
      >
        <DialogTitle id="dialog-container" className="dialog-header">
          <div className="dialog-title">
            <p>카테고리 선택</p>
          </div>
          <Button
            sx={{
              minWidth: 36,
              height: 49,
            }}
            onClick={() => {
              handleClose()
            }}
          >
            <CloseRoundedIcon
              sx={{
                fontSize: 29,
              }}
            />
          </Button>
        </DialogTitle>
        <div className="dialog-body-box">
          <div className="diary-dialog-body">
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('PICTURE')
              }}
            >
              <img
                src={require('../../assets/picture.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>사진 & 글로 남기기</div>
            </button>
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('VIDEO')
              }}
            >
              <img
                src={require('../../assets/recording.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>영상으로 남기기</div>
            </button>
            <button
              type="button"
              className=" diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('VOICE')
              }}
            >
              <img
                src={require('../../assets/voice.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>목소리로 남기기</div>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default DiaryMain
