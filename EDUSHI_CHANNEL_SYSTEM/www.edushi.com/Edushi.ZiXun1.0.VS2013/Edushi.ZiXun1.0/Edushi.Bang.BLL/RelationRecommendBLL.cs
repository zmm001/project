�}
� r �	  ^�av;�7���a	���#_�����u���o7�S�q��.�>�t'�P������e���B9�O�Բ��7����@h�*jRG�1�[�#Hʌ>o�=��X�c�Խ揮Nr�c�M�ު�K��d�.���.sJ�z�{e?<]�((�����O`���h��a���&U��
k�Qd�}��\?����r�[/4�V����������洮�����	,��dB���vw�P����d�X$-?�V#�4OǓԬ���djm��d2�0�����?� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�end(int IA_ID)
        {
            object objType = new DataAccess().CreateObject("RelationRecommendDAL");//创建RelationRecommend的实例
            return objType == null ? new List<RelationRecommendModel>() : ((IRelationRecommendDAL)objType).GetRelationRecommend(IA_ID);
        }
        #endregion
    }
}
