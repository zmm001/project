�}p� r !  AB�`��i���a	���#^���}����a�`�s���Eq:�0��L��no3�B�:K���[�%�MV7L��]��诞�$��0&��0�y�~)T�v� ��V}�2�����\�Ta`//�y�Eė�z�*؏b��� D۵���O��u�
|1f�L��ƒ��/�I`������8q>�+:���%Uw�i�#�b�e�M��29�*��H-�sK�T��5�Q-08�^X��(b��T<�.Er#��R�"Z{����������^ KA�:7�o����ꎉ=��@.1<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�g ReflectCacheID)
        {
            object objType = new DataAccess().CreateObject("ZiXunInfoTypeDAL", ReflectCacheID);//创建ZiXunInfoTypeDAL的实例
            return objType == null ? new List<ZiXunInfoTypeModel>() : ((IZiXunInfoTypeDAL)objType).getAllInfoType();
        }
        #endregion
    }
}
