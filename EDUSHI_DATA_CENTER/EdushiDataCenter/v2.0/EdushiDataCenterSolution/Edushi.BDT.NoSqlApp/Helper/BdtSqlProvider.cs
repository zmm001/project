�}� r ,  #>����7��a	��� ��_�޷}���>tx��>� ������� 0�I�M:��A��!� �"�Jy��1t�&э�ɉ7��Qr%e�I��B�,���iY(�|�Ʋ���M�9�ڊK*��}�e)/_�ʥ����O�}��mA��P��#v:�϶²x�P�bP۶��	��KR�4׮m(�+����A��=�*~�m�h�bKզPCȍt�b���:�����L�Ix���p����7uA>&�,r��� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�.GetTopicDataTable(iId);
        }

        public Edushi.BDT.Contract.Model.Topic GetTopic(int iId)
        {
            List<Edushi.BDT.Contract.Model.Topic> topics = this.D.GetTopicList(this.GetTopicById(iId));
            if (topics != null && topics.Count > 0)
            {
                return topics[0];
            }
            return null;
        }
        
    }
}
