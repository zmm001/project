�}�� r   ��O-�JzS��a	��� �;����}�QEƚb�CE����5@�7�������KT��M:��qbȪ������ѐ���8$�|����|>99M7>D~�u)Z$�H�6��Li��Q�z��	<=�I�i�}v.�/�/a�	��A�J��p_��G%a��u�no�8ӫ6rlJT��
u�PR�]�w���=�!m徠e������L���xf8����������^�M���@����ocJ���T!�`�� ��}� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD$9��(����D���ҷB��i��c_e�a�.�:��U�r�������aT�,(���B���kP�z��D{L�$oQ�j!iz��8hܕC�=���d�*i�y��������My�G?e�vu,;�7n~:b����p����B�(#��эr����M����^@I�ι�=����QHIC����s���#�I��x3�S�^���`�.���;�I�ҩ�˨Z�ȟ�D����W�@�-!��\��9rd�م"�(���>M�E�d)8�cpJ��������Y�"w}��oY�mi��X[h�Qm[����@h&���V�G{K��P�\���m�T���Q'��R�t�Ol:�����v3�A|9�6�����*�G���T����"�$U?m�Ze��;�
���PW�]B��e�e����<�]��?i��=�K}1_F�YB�n��^�\���<ε�=�5f�K��b݋R�0�o����]��R�����   /// </summary>
        /// <returns></returns>
        public List<MapPoiTypeModel> GetAllMapPoiType()
        {
            return new DataAccess.nosql.read.MapPoiType(Ips, ReplicaSetName, ConnectTimeout, MongoDbName).GetAllMapPoiType();
        }
        #endregion
    }
}
